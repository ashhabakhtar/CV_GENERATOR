import React from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Settings2, 
  Layout as LayoutIcon, 
  FileText,
  Code2,
  Wand2,
  Download,
  Loader2,
  Sparkles
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumePDF } from './ResumePDF';
import { ResumeData } from '../types/resume';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  atsSafeMode: boolean;
  setAtsSafeMode: (val: boolean) => void;
  resumeData: ResumeData;
}

const SECTIONS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Settings2 },
  { id: 'templates', label: 'Templates', icon: LayoutIcon },
  { id: 'checker', label: 'ATS Optimizer', icon: Sparkles },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  atsSafeMode, 
  setAtsSafeMode,
  resumeData
}) => {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 glass border-r border-white/10 p-6 flex flex-col gap-8">
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
          <FileText className="text-white w-6 h-6" />
        </div>
        <h1 className="font-bold text-xl tracking-tight text-white leading-none">
          CV <span className="text-primary-400">MAKER</span>
        </h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                isActive 
                  ? "bg-primary-500/10 text-primary-400 border border-primary-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className={cn(
                "w-5 h-5",
                isActive ? "text-primary-400" : "text-slate-500 group-hover:text-primary-400"
              )} />
              {section.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
        <div className="px-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">ATS Safe Mode</span>
            <button 
              onClick={() => setAtsSafeMode(!atsSafeMode)}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                atsSafeMode ? "bg-primary-500" : "bg-slate-700"
              )}
            >
              <span className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                atsSafeMode ? "translate-x-4" : "translate-x-0"
              )} />
            </button>
          </div>
          <p className="text-[10px] text-slate-500 leading-normal pl-1">
            Enforces single-column, standard fonts, and strips non-ATS elements.
          </p>
        </div>

        <PDFDownloadLink
          document={<ResumePDF data={resumeData} />}
          fileName={`${resumeData.personalInfo.fullName || 'Resume'}.pdf`}
          className="w-full"
        >
          {/* @ts-ignore */}
          {({ loading }) => (
            <button 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-white text-slate-950 px-4 py-3 rounded-xl font-semibold text-sm hover:bg-primary-50 transition-colors shadow-lg active:scale-95 duration-200 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {loading ? 'Generating...' : 'Export PDF'}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </aside>
  );
};
