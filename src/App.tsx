import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { ExperienceForm } from './components/ExperienceForm';
import { EducationForm } from './components/EducationForm';
import { SkillsForm } from './components/SkillsForm';
import { TemplateSelector } from './components/TemplateSelector';
import { ATSChecker } from './components/ATSChecker';
import { ResumeReviewModal } from './components/ResumeReviewModal';
import { ATSMinimal } from './templates/ATSMinimal';
import { ModernPremium } from './templates/ModernPremium';
import { ClassicProfessional } from './templates/ClassicProfessional';
import { CreativeMinimalist } from './templates/CreativeMinimalist';
import { ProfessionalModern } from './templates/ProfessionalModern';
import { CleanMinimalist } from './templates/CleanMinimalist';
import { useResume } from './hooks/useResume';
import { useATSChecker } from './hooks/useATSChecker';
import { useResumeParser } from './hooks/useResumeParser';
import { AnimatePresence, motion } from 'framer-motion';
import { ResumeData } from './types/resume';
import { Eye, Edit3 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const [pendingParsedData, setPendingParsedData] = useState<Partial<ResumeData> | null>(null);

  const { 
    state, 
    updatePersonalInfo, 
    updateExperience, 
    updateEducation, 
    updateSkills,
    setAtsSafeMode,
    setTemplate,
    setJobDescription,
    batchUpdate
  } = useResume();

  const { parseResume, isParsing } = useResumeParser();
  const analysis = useATSChecker(state.data, state.jobDescription);

  const isFormValid = useMemo(() => {
    const hasExpDateError = state.data.experience.some(exp => {
      if (exp.current || !exp.startDate || !exp.endDate) return false;
      const start = new Date(exp.startDate);
      const end = new Date(exp.endDate);
      return !isNaN(start.getTime()) && !isNaN(end.getTime()) && end < start;
    });

    const hasEduDateError = state.data.education.some(edu => {
      if (!edu.startDate || !edu.endDate) return false;
      const start = new Date(edu.startDate);
      const end = new Date(edu.endDate);
      return !isNaN(start.getTime()) && !isNaN(end.getTime()) && end < start;
    });

    const hasPersonalError = !state.data.personalInfo.fullName || !state.data.personalInfo.email;

    return !hasExpDateError && !hasEduDateError && !hasPersonalError;
  }, [state.data]);

  const handleImport = async (file: File) => {
    const data = await parseResume(file);
    if (data) {
      setPendingParsedData(data);
    }
  };

  const confirmImport = (data: Partial<ResumeData>) => {
    batchUpdate(data);
    setPendingParsedData(null);
    setActiveTab('personal');
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfoForm data={state.data.personalInfo} update={updatePersonalInfo} />;
      case 'experience': return <ExperienceForm data={state.data.experience} update={updateExperience} />;
      case 'education': return <EducationForm data={state.data.education} update={updateEducation} />;
      case 'skills': return <SkillsForm data={state.data.skills} update={updateSkills} />;
      case 'templates': return <TemplateSelector selectedId={state.templateId} onSelect={setTemplate} atsSafeMode={state.atsSafeMode} />;
      case 'checker': return <ATSChecker jobDescription={state.jobDescription} setJobDescription={setJobDescription} analysis={analysis} />;
      default: return null;
    }
  };

  const renderPreview = () => {
    const effectiveTemplateId = state.atsSafeMode ? 'ats-minimal' : state.templateId;
    const props = { data: state.data };
    switch (effectiveTemplateId) {
      case 'ats-minimal': return <ATSMinimal {...props} />;
      case 'modern-premium': return <ModernPremium {...props} />;
      case 'classic-professional': return <ClassicProfessional {...props} />;
      case 'creative-minimalist': return <CreativeMinimalist {...props} />;
      case 'professional-modern': return <ProfessionalModern {...props} />;
      case 'clean-minimalist': return <CleanMinimalist {...props} />;
      default: return <ATSMinimal {...props} />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-950 text-slate-200 overflow-hidden font-inter">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        atsSafeMode={state.atsSafeMode}
        setAtsSafeMode={setAtsSafeMode}
        resumeData={state.data}
        onImport={handleImport}
        isParsing={isParsing}
        isFormValid={isFormValid}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden relative pb-16 lg:pb-0">
        <section className={cn(
          "flex-1 p-5 md:p-8 lg:p-12 overflow-y-auto h-full scroll-smooth transition-all duration-300",
          showPreviewMobile ? "hidden lg:block" : "block"
        )}>
          <div className="max-w-3xl mx-auto space-y-10">
            <header className="hidden lg:block mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-[2px] bg-primary-500" />
                <span className="text-primary-400 text-[10px] font-black uppercase tracking-[0.3em]">Live Cloud Designer</span>
              </div>
              <h1 className="text-5xl font-black text-white tracking-tighter leading-none">
                Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-500">Resume.</span>
              </h1>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderForm()}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className={cn(
          "flex-1 bg-slate-950/50 border-white/5 p-4 md:p-8 lg:p-12 overflow-y-auto h-full transition-all duration-300 lg:border-l",
          !showPreviewMobile ? "hidden lg:block" : "block"
        )}>
          <div className="sticky top-0 z-20 bg-slate-950 p-4 mb-10 rounded-2xl border border-white/10 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-pulse" />
              <span className="text-[10px] font-black text-slate-100 uppercase tracking-widest">Global Live View</span>
            </div>
            <span className="text-[10px] font-bold text-primary-400 bg-primary-400/10 px-3 py-1 rounded-full">
              {state.atsSafeMode ? 'ATS COMPLIANT' : 'DESIGNER UI'}
            </span>
          </div>
          
          <div className="flex justify-center">
            <div className="origin-top scale-[0.45] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.5] xl:scale-[0.65] 2xl:scale-[0.8] transition-transform duration-500 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
              {renderPreview()}
            </div>
          </div>
        </section>

        <button
          onClick={() => setShowPreviewMobile(!showPreviewMobile)}
          className="lg:hidden fixed bottom-24 right-6 z-50 w-14 h-14 bg-white text-slate-950 rounded-full flex items-center justify-center shadow-2xl shadow-white/20 active:scale-95 transition-all"
        >
          {showPreviewMobile ? <Edit3 className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
        </button>
      </main>

      <ResumeReviewModal 
        isOpen={!!pendingParsedData}
        onClose={() => setPendingParsedData(null)}
        onConfirm={confirmImport}
        parsedData={pendingParsedData}
      />
    </div>
  );
};

// Helper for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default App;
