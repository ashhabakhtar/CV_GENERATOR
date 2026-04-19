import React from 'react';
import { Plus, Trash2, Wrench, Star } from 'lucide-react';
import { Skill } from '../types/resume';

interface SkillsFormProps {
  data: Skill[];
  update: (data: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, update }) => {
  const addSkill = () => {
    update([...data, { id: crypto.randomUUID(), name: '', rating: 5 }]);
  };

  const removeSkill = (id: string) => {
    update(data.filter((s) => s.id !== id));
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    update(data.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl lg:text-2xl font-bold text-white mb-2">Technical Skills</h2>
          <p className="text-slate-400 text-base md:text-sm">Add your core competencies and rate your proficiency.</p>
        </div>
        <button
          onClick={addSkill}
          className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {data.map((skill) => (
          <div key={skill.id} className="glass-card p-5 border border-white/5 flex items-start gap-4 group bg-white/5">
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-sm md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Skill Name</label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                    placeholder="e.g. React.js"
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm md:text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Proficiency Level</label>
                  <div className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-xl border border-white/10">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => updateSkill(skill.id, { rating: star })}
                        className="transition-transform active:scale-125"
                      >
                        <Star
                          className={`w-6 h-6 md:w-5 md:h-5 ${
                            star <= (skill.rating || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-base md:text-xs font-black text-primary-400">
                      {skill.rating}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => removeSkill(skill.id)}
              className="mt-2 p-2 text-slate-500 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/5 border-dashed">
            <Wrench className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 text-base">No skills added yet. Use the button above to start.</p>
          </div>
        )}
      </div>
    </div>
  );
};
