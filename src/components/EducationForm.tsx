import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { Education } from '../types/resume';

interface EducationFormProps {
  data: Education[];
  update: (education: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, update }) => {
  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
    };
    update([...data, newEdu]);
  };

  const removeEducation = (id: string) => {
    update(data.filter((e) => e.id !== id));
  };

  const handleChange = (id: string, field: keyof Education, value: string) => {
    update(data.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Education</h2>
          <p className="text-slate-400 text-sm">Add your academic background and certifications.</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {data.map((edu) => (
          <div key={edu.id} className="glass-card p-6 border border-white/5 relative group">
            <button
              onClick={() => removeEducation(edu.id)}
              className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">School / University</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => handleChange(edu.id, 'school', e.target.value)}
                  placeholder="e.g. Stanford University"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                  placeholder="e.g. Bachelor's"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Field of Study</label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => handleChange(edu.id, 'field', e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => handleChange(edu.id, 'location', e.target.value)}
                  placeholder="e.g. Palo Alto, CA"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Start Date</label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                  placeholder="Sept 2018"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">End Date</label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                  placeholder="June 2022"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-slate-600">
            <GraduationCap className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm">No education history added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
