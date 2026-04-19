import React from 'react';
import { Plus, Trash2, GripVertical, Briefcase } from 'lucide-react';
import { Experience } from '../types/resume';

interface ExperienceFormProps {
  data: Experience[];
  update: (experience: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, update }) => {
  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
    };
    update([...data, newExp]);
  };

  const removeExperience = (id: string) => {
    update(data.filter((e) => e.id !== id));
  };

  const handleChange = (id: string, field: keyof Experience, value: any) => {
    update(data.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const handleBulletChange = (expId: string, index: number, value: string) => {
    update(
      data.map((e) => {
        if (e.id === expId) {
          const newBullets = [...e.description];
          newBullets[index] = value;
          return { ...e, description: newBullets };
        }
        return e;
      })
    );
  };

  const addBullet = (expId: string) => {
    update(
      data.map((e) => (e.id === expId ? { ...e, description: [...e.description, ''] } : e))
    );
  };

  const removeBullet = (expId: string, index: number) => {
    update(
      data.map((e) => {
        if (e.id === expId) {
          const newBullets = e.description.filter((_, i) => i !== index);
          return { ...e, description: newBullets };
        }
        return e;
      })
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Work Experience</h2>
          <p className="text-slate-400 text-sm">List your professional journey, starting with your most recent role.</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Role
        </button>
      </div>

      <div className="space-y-4">
        {data.map((exp, index) => (
          <div key={exp.id} className="glass-card p-6 border border-white/5 relative group">
            <button
              onClick={() => removeExperience(exp.id)}
              className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                  placeholder="e.g. Google"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleChange(exp.id, 'position', e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                  placeholder="Jan 2022"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  placeholder={exp.current ? 'Present' : 'Dec 2023'}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
                className="w-4 h-4 rounded border-white/10 bg-slate-950/50 text-primary-500 focus:ring-primary-500/50"
              />
              <span className="text-xs text-slate-400">I currently work here</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Responsibilities & Achievements</label>
                <button
                  onClick={() => addBullet(exp.id)}
                  className="text-primary-400 hover:text-primary-300 text-[10px] font-bold uppercase tracking-widest"
                >
                  + Add Bullet
                </button>
              </div>
              
              {exp.description.map((bullet, bIndex) => (
                <div key={bIndex} className="flex gap-2 group/bullet">
                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary-500/50 shrink-0" />
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => handleBulletChange(exp.id, bIndex, e.target.value)}
                    placeholder="Describe an achievement or responsibility..."
                    className="flex-1 bg-transparent border-none p-0 text-sm text-slate-300 focus:ring-0 focus:outline-none placeholder:text-slate-600"
                  />
                  <button
                    onClick={() => removeBullet(exp.id, bIndex)}
                    className="opacity-0 group-hover/bullet:opacity-100 text-slate-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-slate-600">
            <Briefcase className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm">No work experience added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
