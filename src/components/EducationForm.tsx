import React from 'react';
import { Plus, Trash2, GraduationCap, X } from 'lucide-react';
import { Education } from '../types/resume';

interface EducationFormProps {
  data: Education[];
  update: (data: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, update }) => {
  const addEducation = () => {
    update([
      ...data,
      {
        id: crypto.randomUUID(),
        school: '',
        degree: '',
        field: '',
        location: '',
        startDate: '',
        endDate: '',
        grade: '',
        description: '',
      },
    ]);
  };

  const removeEducation = (id: string) => {
    update(data.filter((item) => item.id !== id));
  };

  const handleChange = (index: number, updates: Partial<Education>) => {
    const newData = [...data];
    newData[index] = { ...newData[index], ...updates };
    update(newData);
  };

  const isDateInvalid = (start: string, end: string) => {
    if (!start || !end) return false;
    const startDate = new Date(start);
    const endDate = new Date(end);
    return !isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && endDate < startDate;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl lg:text-2xl font-bold text-white mb-2">Education History</h2>
          <p className="text-slate-400 text-base md:text-sm">List your academic qualifications and achievements.</p>
        </div>
        <button
          onClick={addEducation}
          className="p-3 bg-primary-500 text-white rounded-xl shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all active:scale-95 flex items-center gap-2 px-6"
        >
          <Plus className="w-5 h-5" />
          <span className="font-bold text-sm hidden sm:inline">Add Education</span>
        </button>
      </div>

      <div className="space-y-6">
        {data.map((edu, index) => {
          const dateError = isDateInvalid(edu.startDate, edu.endDate);
          return (
            <div key={edu.id} className="glass-card p-6 border border-white/5 relative group bg-white/5">
              <button
                onClick={() => removeEducation(edu.id)}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-sm md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">School / University <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    required
                    value={edu.school}
                    onChange={(e) => handleChange(index, { school: e.target.value })}
                    placeholder="e.g. Stanford University"
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Degree / Course <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    required
                    value={edu.degree}
                    onChange={(e) => handleChange(index, { degree: e.target.value })}
                    placeholder="e.g. Bachelor of Science in CS"
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Start Date <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    required
                    value={edu.startDate}
                    onChange={(e) => handleChange(index, { startDate: e.target.value })}
                    placeholder="2018"
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex justify-between">
                    End Date <span className="text-red-400">*</span>
                    {dateError && <span className="text-red-400 normal-case tracking-normal text-xs font-bold">Invalid range</span>}
                  </label>
                  <input
                    type="text"
                    required
                    value={edu.endDate}
                    onChange={(e) => handleChange(index, { endDate: e.target.value })}
                    placeholder="2022"
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Grade / GPA</label>
                  <input
                    type="text"
                    value={edu.grade}
                    onChange={(e) => handleChange(index, { grade: e.target.value })}
                    placeholder="3.8 / 4.0"
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
