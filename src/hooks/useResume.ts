import { useState, useEffect } from 'react';
import { ResumeData, ResumeState, TemplateId } from '../types/resume';

const INITIAL_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
    jobTitle: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  customSections: [],
};

const STORAGE_KEY = 'antigravity-cv-data';

export const useResume = () => {
  const [state, setState] = useState<ResumeState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved resume data', e);
      }
    }
    return {
      data: INITIAL_DATA,
      templateId: 'ats-minimal',
      atsSafeMode: true,
      jobDescription: '',
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setJobDescription = (jobDescription: string) => {
    setState((prev) => ({ ...prev, jobDescription }));
  };

  const setAnalysis = (analysis: ResumeState['analysis']) => {
    setState((prev) => ({ ...prev, analysis }));
  };

  const updatePersonalInfo = (info: Partial<ResumeState['data']['personalInfo']>) => {
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        personalInfo: { ...prev.data.personalInfo, ...info },
      },
    }));
  };

  const updateExperience = (experience: ResumeState['data']['experience']) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, experience },
    }));
  };

  const updateEducation = (education: ResumeState['data']['education']) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, education },
    }));
  };

  const updateSkills = (skills: ResumeState['data']['skills']) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, skills },
    }));
  };

  const updateProjects = (projects: ResumeState['data']['projects']) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, projects },
    }));
  };

  const setTemplate = (templateId: TemplateId) => {
    setState((prev) => ({ ...prev, templateId }));
  };

  const setAtsSafeMode = (atsSafeMode: boolean) => {
    setState((prev) => ({ ...prev, atsSafeMode }));
  };

  return {
    state,
    updatePersonalInfo,
    updateExperience,
    updateEducation,
    updateSkills,
    updateProjects,
    setTemplate,
    setAtsSafeMode,
    setJobDescription,
    setAnalysis,
  };
};
