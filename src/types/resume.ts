export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  jobTitle: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Expert';
  rating: number; // 1-5
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  technologies: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  customSections: {
    id: string;
    title: string;
    content: string;
  }[];
}

export type TemplateId = 'ats-minimal' | 'modern-premium' | 'classic-professional' | 'creative-minimalist' | 'professional-modern' | 'clean-minimalist';

export interface ATSAnalysis {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  formattingAlerts: string[];
}

export interface ResumeState {
  data: ResumeData;
  templateId: TemplateId;
  atsSafeMode: boolean;
  jobDescription: string;
  analysis?: ATSAnalysis;
  isValid: boolean;
  errors: string[];
}
