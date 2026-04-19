import React from 'react';
import { Plus, Trash2, Settings2 } from 'lucide-react';
import { Skill } from '../types/resume';

interface SkillsFormProps {
  data: Skill[];
  update: (skills: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, update }) => {
  const addSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: '',
      level: 'Intermediate',
      rating: 3,
    };
    update([...data, newSkill]);
  };

  const removeSkill = (id: string) => {
    update(data.filter((s) => s.id !== id));
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    update(data.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Skills & Expertise</h2>
          <p className="text-slate-400 text-sm">Add your technical and soft skills with proficiency levels.</p>
        </div>
        <button
          onClick={addSkill}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {data.map((skill) => (
          <div key={skill.id} className="glass-card p-4 border border-white/5 flex items-start gap-4 group">
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Skill Name</label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                    placeholder="e.g. React"
                    className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex justify-between">
                    Level
                    <span className="text-primary-400 normal-case tracking-normal">{skill.level}</span>
                  </label>
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, { level: e.target.value as any })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all appearance-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Proficiency Level (1-5)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => updateSkill(skill.id, { rating })}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all border ${
                        (skill.rating || 3) >= rating 
                          ? 'bg-primary-500/20 border-primary-500/50 text-primary-400' 
                          : 'bg-slate-950/50 border-white/10 text-slate-600 hover:border-white/20'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1 mt-6"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-slate-600">
            <Settings2 className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm">No skills added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
