import React from 'react';
import { X, Check, RefreshCcw, Briefcase, GraduationCap, Wrench, User } from 'lucide-react';
import { ResumeData } from '../types/resume';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: Partial<ResumeData>) => void;
  parsedData: Partial<ResumeData> | null;
}

export const ResumeReviewModal: React.FC<ResumeReviewModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  parsedData,
}) => {
  if (!isOpen || !parsedData) return null;

  const { personalInfo, skills, experience, education } = parsedData;

  const SectionHeader = ({ icon: Icon, title, count }: { icon: any, title: string, count?: number }) => (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
        <Icon className="w-3.5 h-3.5" />
        {title}
      </h3>
      {count !== undefined && (
        <span className="text-[10px] font-bold text-primary-400 bg-primary-400/10 px-2 py-0.5 rounded-full">
          {count} items
        </span>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full h-full md:h-auto md:max-w-2xl bg-slate-900 border border-white/10 md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:max-h-[85vh]"
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <RefreshCcw className="w-5 h-5 text-primary-400" />
                Review Import
              </h2>
              <p className="text-slate-400 text-xs">Verify the data extracted from your old resume.</p>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8 overflow-y-auto space-y-10 flex-1 custom-scrollbar">
            {/* Personal Info Review */}
            <section>
              <SectionHeader icon={User} title="Personal Details" />
              <div className="grid grid-cols-2 gap-6 bg-white/5 p-5 rounded-2xl border border-white/5">
                <div className="col-span-2">
                  <label className="text-[9px] font-bold text-primary-400 uppercase mb-1 block">Full Name</label>
                  <p className="text-white text-sm font-medium">{personalInfo?.fullName || 'Not found'}</p>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-primary-400 uppercase mb-1 block">Email</label>
                  <p className="text-white text-sm truncate">{personalInfo?.email || 'Not found'}</p>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-primary-400 uppercase mb-1 block">Phone</label>
                  <p className="text-white text-sm">{personalInfo?.phone || 'Not found'}</p>
                </div>
              </div>
            </section>

            {/* Experience Review */}
            <section>
              <SectionHeader icon={Briefcase} title="Work Experience" count={experience?.length} />
              <div className="space-y-3">
                {experience && experience.length > 0 ? (
                  experience.map((exp, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <h4 className="text-sm font-bold text-white">{exp.position}</h4>
                      <p className="text-xs text-primary-400 font-medium mb-2">{exp.company}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600 text-xs italic bg-white/5 p-4 rounded-xl border border-white/5 border-dashed">No work experience detected.</p>
                )}
              </div>
            </section>

            {/* Education Review */}
            <section>
              <SectionHeader icon={GraduationCap} title="Education" count={education?.length} />
              <div className="space-y-3">
                {education && education.length > 0 ? (
                  education.map((edu, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                      <p className="text-xs text-slate-400">{edu.school}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600 text-xs italic bg-white/5 p-4 rounded-xl border border-white/5 border-dashed">No education history detected.</p>
                )}
              </div>
            </section>

            {/* Skills Review */}
            <section>
              <SectionHeader icon={Wrench} title="Skills Identified" count={skills?.length} />
              <div className="flex flex-wrap gap-2">
                {skills && skills.length > 0 ? (
                  skills.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold rounded-full">
                      {s.name}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-600 text-xs italic">No skills identified automatically.</p>
                )}
              </div>
            </section>

            {/* Warning */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl">
              <p className="text-[11px] text-yellow-200/70 leading-relaxed">
                <span className="font-extrabold text-yellow-400 uppercase tracking-wider mr-2">Note:</span> 
                Parsing is heuristic. Job descriptions and complex dates may need manual refinement after import.
              </p>
            </div>
          </div>

          <div className="p-6 bg-slate-950/50 flex items-center justify-end gap-4 shrink-0 border-t border-white/5">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-white transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(parsedData)}
              className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-500/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              Import Everything
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
