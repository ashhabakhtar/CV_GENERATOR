import { useState } from 'react';
import { ResumeData, Skill, Experience, Education } from '../types/resume';

// Load PDF.js from CDN
const PDFJS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs';
const WORKER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';

export const useResumeParser = () => {
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseResume = async (file: File): Promise<Partial<ResumeData> | null> => {
    setIsParsing(true);
    setError(null);

    try {
      // @ts-ignore
      const pdfjs = await import(PDFJS_URL);
      pdfjs.GlobalWorkerOptions.workerSrc = WORKER_URL;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        // Extract string items and maintain basic line structure
        // @ts-ignore
        fullText += textContent.items.map(item => item.str).join(" ") + "\n";
      }

      const parsedData = extractDataFromText(fullText);
      setIsParsing(false);
      return parsedData;
    } catch (err) {
      console.error("PDF Parsing Error:", err);
      setError("Failed to parse PDF. Please try again or fill manually.");
      setIsParsing(false);
      return null;
    }
  };

  const extractDataFromText = (text: string): Partial<ResumeData> => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    const data: Partial<ResumeData> = {
      personalInfo: {
        fullName: lines[0]?.substring(0, 50) || '',
        email: text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || '',
        phone: text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0] || '',
        location: '',
        website: text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+|github\.com\/[a-zA-Z0-9_-]+/i)?.[0] || '',
        summary: '',
        jobTitle: lines[1]?.substring(0, 50) || '',
      },
      experience: [],
      education: [],
      skills: [],
    };

    // Helper to find section boundaries
    const sections: Record<string, string> = {
      summary: '',
      experience: '',
      education: '',
      skills: '',
    };

    const sectionHeadings = {
      summary: /summary|profile|objective|about me/i,
      experience: /experience|work history|professional experience|employment/i,
      education: /education|academic|qualifications/i,
      skills: /skills|technical skills|expertise|core competencies/i,
    };

    let currentSection = '';
    lines.forEach(line => {
      let foundHeading = false;
      for (const [key, regex] of Object.entries(sectionHeadings)) {
        if (regex.test(line) && line.length < 30) {
          currentSection = key;
          foundHeading = true;
          break;
        }
      }
      if (!foundHeading && currentSection) {
        sections[currentSection] += line + '\n';
      }
    });

    // 1. Parse Summary
    if (sections.summary && data.personalInfo) {
      data.personalInfo.summary = sections.summary.trim().substring(0, 500);
    }

    // 2. Parse Skills (Dynamic Extraction)
    if (sections.skills) {
      const skillText = sections.skills;
      // Split by common delimiters
      const potentialSkills = skillText.split(/[,\n|•]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 30);
      data.skills = Array.from(new Set(potentialSkills)).map(name => ({
        id: crypto.randomUUID(),
        name,
        level: 'Intermediate',
        rating: 3
      }));
    }

    // 3. Parse Experience (Date Range Recognition)
    if (sections.experience) {
      const expBlocks = sections.experience.split(/\n(?=(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|\d{1,2})?\s*\d{2,4}\s*[-–—]\s*(?:Present|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|\d{1,2})?\s*\d{2,4})/gi);
      
      data.experience = expBlocks.map(block => {
        const bLines = block.trim().split('\n');
        const dateMatch = block.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|\d{1,2})?\s*\d{2,4}\s*[-–—]\s*(?:Present|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|\d{1,2})?\s*\d{2,4})/i);
        
        const headerRange = bLines[0];
        const [pos, comp] = headerRange.split(/at|[,|–—-]/).map(s => s.trim());
        
        return {
          id: crypto.randomUUID(),
          company: comp || bLines[1] || 'Company Name',
          position: pos || 'Position Title',
          location: '',
          startDate: dateMatch?.[0].split(/[-–—]/)[0]?.trim() || '',
          endDate: dateMatch?.[0].split(/[-–—]/)[1]?.trim() || '',
          current: /present/i.test(dateMatch?.[0] || ''),
          description: bLines.slice(1).filter(l => l.length > 20),
        };
      }).filter(exp => exp.company !== 'Company Name');
    }

    // 4. Parse Education
    if (sections.education) {
      const eduLines = sections.education.trim().split('\n');
      data.education = eduLines.map(line => {
        const degreeKeywords = /Bachelor|Master|MBA|PhD|BSc|MSc|BA|MA|B\.A|B\.S|M\.A|M\.S/i;
        if (degreeKeywords.test(line)) {
          const parts = line.split(/[,|]/).map(p => p.trim());
          return {
            id: crypto.randomUUID(),
            school: parts[1] || parts[0],
            degree: parts[0],
            field: '',
            location: '',
            startDate: '',
            endDate: '',
          };
        }
        return null;
      }).filter(Boolean) as Education[];
    }

    return data;
  };

  return { parseResume, isParsing, error };
};
