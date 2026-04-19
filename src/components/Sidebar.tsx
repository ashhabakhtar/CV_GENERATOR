import React from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Settings2, 
  Layout as LayoutIcon, 
  Download,
  Loader2,
  Sparkles,
  Upload,
  FileText
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
  activeTab: string;
  setActiveTab: (tab: string) => void;
  atsSafeMode: boolean;
  setAtsSafeMode: (val: boolean) => void;
  resumeData: ResumeData;
  onImport: (file: File) => void;
  isParsing: boolean;
  isFormValid: boolean;
}

const SECTIONS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Settings2 },
  { id: 'templates', label: 'Templates', icon: LayoutIcon },
  { id: 'checker', label: 'Optimizer', icon: Sparkles },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  atsSafeMode,
  setAtsSafeMode,
  resumeData,
  onImport,
  isParsing,
  isFormValid
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-slate-900 border-r border-white/5 flex-col h-screen sticky top-0 shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black text-white tracking-tight italic">
              SMART<span className="text-primary-500">CV</span>
            </h1>
          </div>

          <nav className="space-y-1.5">
            {SECTIONS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm",
                    isActive 
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" 
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-500")} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4 pt-6 border-t border-white/5">
          <div className="px-2 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ATS Safe Mode</span>
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
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden" />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isParsing}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold hover:bg-white/10 transition-all text-[10px] uppercase tracking-widest disabled:opacity-50"
            >
              {isParsing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              {isParsing ? 'Parsing...' : 'Import Resume'}
            </button>
          </div>

          <div className="relative group">
            {!isFormValid && (
              <div className="absolute -top-12 left-0 right-0 bg-red-500 text-white text-[9px] font-bold py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center shadow-lg">
                Please correct errors
              </div>
            )}
            <PDFDownloadLink
              document={<ResumePDF data={resumeData} />}
              fileName={`${resumeData.personalInfo.fullName || 'Resume'}.pdf`}
              style={{ display: isFormValid ? 'block' : 'none' }}
            >
              {/* @ts-ignore */}
              {({ loading }) => (
                <button 
                  disabled={loading}
                  className="w-full h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl flex items-center justify-center gap-3 font-black transition-all shadow-xl shadow-primary-500/30 active:scale-95 duration-200"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                  {loading ? '...' : 'Export PDF'}
                </button>
              )}
            </PDFDownloadLink>
            {!isFormValid && (
              <button className="w-full h-14 bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center gap-3 font-black cursor-not-allowed border border-white/5 text-xs">
                Fix Errors
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 pb-safe">
        <div className="flex items-center justify-between gap-1">
          {SECTIONS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex flex-col items-center gap-2 flex-1 py-1.5 transition-all outline-none",
                  isActive ? "text-primary-400 scale-110" : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Icon className={cn("w-7 h-7", isActive ? "stroke-[3px]" : "stroke-[2px]")} />
                <span className={cn(
                  "text-xs font-black uppercase tracking-tighter transition-all",
                  isActive ? "opacity-100" : "opacity-80"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Top Header */}
      <header className="lg:hidden h-20 bg-slate-950 border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-black text-white tracking-widest italic leading-none">SMART<span className="text-primary-500">CV</span></span>
        </div>
        <div className="flex items-center gap-4">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden" />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5"
          >
            <Upload className="w-6 h-6" />
          </button>
          
          <PDFDownloadLink
            document={<ResumePDF data={resumeData} />}
            fileName={`${resumeData.personalInfo.fullName || 'Resume'}.pdf`}
            style={{ display: isFormValid ? 'block' : 'none' }}
          >
             {/* @ts-ignore */}
            {({ loading }) => (
              <button disabled={loading} className="p-3 text-primary-400 bg-primary-400/10 rounded-xl border border-primary-400/10 active:scale-95 transition-all">
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </header>
    </>
  );
};
