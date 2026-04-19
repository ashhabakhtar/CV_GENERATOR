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
    };
    update([...data, newSkill]);
  };

  const removeSkill = (id: string) => {
    update(data.filter((s) => s.id !== id));
  };

  const handleChange = (id: string, field: keyof Skill, value: any) => {
    update(data.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Skills</h2>
          <p className="text-slate-400 text-sm">Add your technical and soft skills to stand out.</p>
        </div>
        <button
          onClick={addSkill}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.map((skill) => (
          <div key={skill.id} className="glass-card p-4 border border-white/5 flex items-center gap-3 group">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => handleChange(skill.id, 'name', e.target.value)}
              placeholder="e.g. React.js"
              className="flex-1 bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
            />
            <select
              value={skill.level}
              onChange={(e) => handleChange(skill.id, 'level', e.target.value)}
              className="bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500/50 transition-all"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-slate-600">
          <Settings2 className="w-12 h-12 mb-3 opacity-20" />
          <p className="text-sm">No skills added yet.</p>
        </div>
      )}
    </div>
  );
};
