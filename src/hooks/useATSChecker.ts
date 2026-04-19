import { useMemo } from 'react';
import { ResumeData, ATSAnalysis } from '../types/resume';

const COMMON_SKILLS = [
  'python', 'javascript', 'typescript', 'react', 'node', 'java', 'aws', 'docker', 'sql', 'agile', 'scrum',
  'frontend', 'backend', 'fullstack', 'machine learning', 'data analysis', 'git', 'ci/cd', 'cloud',
  'api', 'rest', 'graphql', 'css', 'html', 'management', 'leadership', 'communication', 'problem solving'
];

export const useATSChecker = (resumeData: ResumeData, jobDescription: string) => {
  const analysis = useMemo((): ATSAnalysis => {
    if (!jobDescription || jobDescription.trim().length === 0) {
      return { score: 0, matchedKeywords: [], missingKeywords: [], formattingAlerts: [] };
    }

    const resumeText = JSON.stringify(resumeData).toLowerCase();
    const jdText = jobDescription.toLowerCase();

    // 1. Keyword Extraction from JD
    const jdWords = jdText.split(/[^a-zA-Z0-9]/).filter(w => w.length > 2);
    const potentialKeywords = Array.from(new Set([...jdWords.filter(w => COMMON_SKILLS.includes(w))]));

    // 2. Matching
    const matchedKeywords = potentialKeywords.filter(k => resumeText.includes(k));
    const missingKeywords = potentialKeywords.filter(k => !resumeText.includes(k));

    // 3. Formatting Alerts
    const alerts: string[] = [];
    if (!resumeData.personalInfo.fullName) alerts.push('Full Name is missing.');
    if (!resumeData.personalInfo.email) alerts.push('Contact email is essential.');
    if (resumeData.experience.length === 0) alerts.push('No work experience listed.');
    if (resumeData.education.length === 0) alerts.push('Education section is empty.');
    
    const bulletCounts = resumeData.experience.map(e => e.description.split('\n').filter(d => d.trim()).length);
    if (bulletCounts.some(c => c < 3)) alerts.push('Some job descriptions are too thin (aim for 3+ bullets).');

    // 4. Score Calculation
    let score = 0;
    
    // Keyword match weighting (60%)
    if (potentialKeywords.length > 0) {
      score += (matchedKeywords.length / potentialKeywords.length) * 60;
    }
    
    // Structure & Section weighting (40%)
    const sectionScore = (
      (resumeData.personalInfo.fullName ? 1 : 0) +
      (resumeData.experience.length > 0 ? 1 : 0) +
      (resumeData.education.length > 0 ? 1 : 0) +
      (resumeData.skills.length > 0 ? 1 : 0)
    ) / 4 * 40;
    
    score += sectionScore;

    return {
      score: Math.round(score),
      matchedKeywords,
      missingKeywords,
      formattingAlerts: alerts
    };
  }, [resumeData, jobDescription]);

  return analysis;
};
