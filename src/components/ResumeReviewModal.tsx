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
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-xs md:text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2.5">
        <Icon className="w-4 h-4 md:w-3.5 md:h-3.5 text-primary-400" />
        {title}
      </h3>
      {count !== undefined && (
        <span className="text-[11px] font-black text-primary-400 bg-primary-400/10 px-3 py-1 rounded-full">
          {count} {count === 1 ? 'entry' : 'entries'}
        </span>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full h-full md:h-auto md:max-w-2xl bg-slate-900 border border-white/10 md:rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:max-h-[85vh] transition-all"
        >
          <div className="p-7 border-b border-white/5 flex items-center justify-between shrink-0 bg-slate-950/50">
            <div>
              <h2 className="text-2xl font-black text-white mb-1.5 flex items-center gap-3">
                <RefreshCcw className="w-6 h-6 text-primary-400" />
                Review & Edit
              </h2>
              <p className="text-slate-400 text-sm font-medium tracking-tight">Verify extracted data from your resume.</p>
            </div>
            <button onClick={onClose} className="p-2.5 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all">
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="p-8 md:p-10 overflow-y-auto space-y-12 flex-1 custom-scrollbar scroll-smooth">
            {/* Personal Info Review */}
            <section>
              <SectionHeader icon={User} title="Personal Details" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 p-6 rounded-2xl border border-white/5 shadow-inner">
                <div className="md:col-span-2">
                  <label className="text-xs font-black text-primary-400/80 uppercase mb-2 block tracking-widest">Full Name</label>
                  <p className="text-white text-lg font-bold truncate">{personalInfo?.fullName || 'Not found'}</p>
                </div>
                <div>
                  <label className="text-xs font-black text-primary-400/80 uppercase mb-2 block tracking-widest">Email Address</label>
                  <p className="text-white text-base font-medium truncate">{personalInfo?.email || 'Not found'}</p>
                </div>
                <div>
                  <label className="text-xs font-black text-primary-400/80 uppercase mb-2 block tracking-widest">Contact Phone</label>
                  <p className="text-white text-base font-medium">{personalInfo?.phone || 'Not found'}</p>
                </div>
              </div>
            </section>

            {/* Experience Review */}
            <section>
              <SectionHeader icon={Briefcase} title="Career History" count={experience?.length} />
              <div className="space-y-4">
                {experience && experience.length > 0 ? (
                  experience.map((exp, i) => (
                    <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-primary-500/30 transition-all">
                      <h4 className="text-base font-black text-white mb-1">{exp.position}</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-primary-400 font-black uppercase tracking-tight">{exp.company}</p>
                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600 text-sm italic bg-white/5 p-6 rounded-2xl border border-white/5 border-dashed text-center">No career entries identified.</p>
                )}
              </div>
            </section>

            {/* Education Review */}
            <section>
              <SectionHeader icon={GraduationCap} title="Education" count={education?.length} />
              <div className="space-y-4">
                {education && education.length > 0 ? (
                  education.map((edu, i) => (
                    <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-primary-500/30 transition-all">
                      <h4 className="text-base font-bold text-white mb-1">{edu.degree}</h4>
                      <p className="text-sm text-slate-400 font-medium">{edu.school}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600 text-sm italic bg-white/5 p-6 rounded-2xl border border-white/5 border-dashed text-center">No academic history detected.</p>
                )}
              </div>
            </section>

            {/* Skills Review */}
            <section>
              <SectionHeader icon={Wrench} title="Skills Discovered" count={skills?.length} />
              <div className="flex flex-wrap gap-3">
                {skills && skills.length > 0 ? (
                  skills.map((s, i) => (
                    <span key={i} className="px-4 py-2 bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-black rounded-xl uppercase tracking-tighter shadow-sm">
                      {s.name}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-600 text-base italic w-full text-center">No skills detected automatically.</p>
                )}
              </div>
            </section>

            {/* Warning Info */}
            <div className="bg-yellow-500/5 border border-yellow-500/20 p-6 rounded-2xl flex gap-4">
              <div className="w-1.5 h-auto bg-yellow-500/40 rounded-full" />
              <p className="text-sm text-yellow-200/80 leading-relaxed font-medium">
                <span className="font-black text-yellow-400 uppercase tracking-wider block mb-1">Notice</span> 
                Automated parsing is a best-guess effort. Please refine job descriptions and complex date formats after importing.
              </p>
            </div>
          </div>

          <div className="p-7 md:p-8 bg-slate-950/80 flex flex-col md:flex-row items-stretch md:items-center justify-end gap-5 shrink-0 border-t border-white/5 backdrop-blur-xl">
            <button
              onClick={onClose}
              className="px-8 py-3 text-sm font-black text-slate-500 hover:text-white transition-all uppercase tracking-[0.2em] order-2 md:order-1"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(parsedData)}
              className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-4.5 rounded-2xl font-black text-base shadow-[0_15px_30px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3 transition-all active:scale-95 order-1 md:order-2"
            >
              <Check className="w-5 h-5 stroke-[3px]" />
              Import Data
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
