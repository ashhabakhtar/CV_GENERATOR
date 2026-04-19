import React, { useState } from 'react';
import { Plus, Trash2, Briefcase, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Experience } from '../types/resume';

interface ExperienceFormProps {
  data: Experience[];
  update: (data: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, update }) => {
  const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id || null);

  const addExperience = () => {
    const newEntry: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    update([...data, newEntry]);
    setExpandedId(newEntry.id);
  };

  const removeExperience = (id: string) => {
    update(data.filter((item) => item.id !== id));
  };

  const handleChange = (id: string, field: keyof Experience, value: any) => {
    update(
      data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const isDateInvalid = (start: string, end: string) => {
    if (!start || !end) return false;
    const startDate = new Date(start);
    const endDate = new Date(end);
    return !isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && endDate < startDate;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl lg:text-2xl font-bold text-white mb-2">Work History</h2>
          <p className="text-slate-400 text-base md:text-sm">Highlight your professional achievements and roles.</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add Role</span>
        </button>
      </div>

      <div className="space-y-4">
        {data.map((exp, index) => {
          const isExpanded = expandedId === exp.id;
          const dateError = isDateInvalid(exp.startDate, exp.endDate);

          return (
            <div key={exp.id} className="glass-card overflow-hidden group border border-white/5">
              <div 
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 border border-primary-500/20">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{exp.position || 'Job Position'}</h3>
                    <p className="text-sm text-slate-400">{exp.company || 'Company Name'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExperience(exp.id);
                    }}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {isExpanded && (
                <div className="p-6 pt-2 border-t border-white/5 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <label className="text-sm md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Company <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        required
                        value={exp.company}
                        onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                        placeholder="e.g. Google"
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-sm md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Position <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        required
                        value={exp.position}
                        onChange={(e) => handleChange(exp.id, 'position', e.target.value)}
                        placeholder="e.g. Senior Developer"
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-sm md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Start Date <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        required
                        value={exp.startDate}
                        onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                        placeholder="Jan 2022"
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-sm md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex justify-between">
                        End Date {!exp.current && <span className="text-red-400">*</span>}
                        {dateError && <span className="text-red-400 normal-case tracking-normal text-xs font-bold">Invalid range</span>}
                      </label>
                      <input
                        type="text"
                        required={!exp.current}
                        disabled={exp.current}
                        value={exp.current ? '' : exp.endDate}
                        onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                        placeholder={exp.current ? 'Present' : 'Dec 2023'}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all disabled:opacity-50 font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
                      className="w-5 h-5 rounded border-white/10 bg-slate-950/50 text-primary-500 focus:ring-primary-500"
                    />
                    <label htmlFor={`current-${exp.id}`} className="text-base md:text-sm text-slate-400 font-medium">I currently work here</label>
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-sm md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
                      placeholder="Describe your achievements and impact..."
                      rows={5}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all resize-none font-medium leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
