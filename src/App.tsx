import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { ExperienceForm } from './components/ExperienceForm';
import { EducationForm } from './components/EducationForm';
import { SkillsForm } from './components/SkillsForm';
import { TemplateSelector } from './components/TemplateSelector';
import { ATSChecker } from './components/ATSChecker';
import { ATSMinimal } from './templates/ATSMinimal';
import { ModernPremium } from './templates/ModernPremium';
import { ClassicProfessional } from './templates/ClassicProfessional';
import { CreativeMinimalist } from './templates/CreativeMinimalist';
import { useResume } from './hooks/useResume';
import { useATSChecker } from './hooks/useATSChecker';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const { 
    state, 
    updatePersonalInfo, 
    updateExperience, 
    updateEducation, 
    updateSkills,
    setAtsSafeMode,
    setTemplate,
    setJobDescription
  } = useResume();

  const analysis = useATSChecker(state.data, state.jobDescription);

  const renderForm = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm data={state.data.personalInfo} update={updatePersonalInfo} />;
      case 'experience':
        return <ExperienceForm data={state.data.experience} update={updateExperience} />;
      case 'education':
        return <EducationForm data={state.data.education} update={updateEducation} />;
      case 'skills':
        return <SkillsForm data={state.data.skills} update={updateSkills} />;
      case 'templates':
        return (
          <TemplateSelector 
            selectedId={state.templateId} 
            onSelect={setTemplate} 
            atsSafeMode={state.atsSafeMode} 
          />
        );
      case 'checker':
        return (
          <ATSChecker 
            jobDescription={state.jobDescription} 
            setJobDescription={setJobDescription} 
            analysis={analysis} 
          />
        );
      default:
        return null;
    }
  };

  const renderPreview = () => {
    // Force ATS Minimal if Safe Mode is on
    const effectiveTemplateId = state.atsSafeMode ? 'ats-minimal' : state.templateId;

    switch (effectiveTemplateId) {
      case 'ats-minimal':
        return <ATSMinimal data={state.data} />;
      case 'modern-premium':
        return <ModernPremium data={state.data} />;
      case 'classic-professional':
        return <ClassicProfessional data={state.data} />;
      case 'creative-minimalist':
        return <CreativeMinimalist data={state.data} />;
      default:
        return <ATSMinimal data={state.data} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        atsSafeMode={state.atsSafeMode}
        setAtsSafeMode={setAtsSafeMode}
        resumeData={state.data}
      />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen scroll-smooth">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Side */}
          <div className="space-y-8">
            <header className="mb-8">
              <span className="text-primary-400 text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                Editor Phase
              </span>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Craft Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">Future.</span>
              </h1>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderForm()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Preview Side */}
          <div className="sticky top-8 self-start">
            <div className="mb-4 flex items-center justify-between px-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                Live Preview
              </span>
              <span className="text-[10px] text-slate-600 font-mono">
                {state.atsSafeMode ? 'ATS-SAFE ACTIVE' : 'PREMIUM UI'}
              </span>
            </div>
            
            <div className="scale-[0.55] lg:scale-[0.65] xl:scale-[0.75] origin-top-left xl:origin-top transform-gpu">
              {renderPreview()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
