import React from 'react';
import { Layout, Check, ShieldCheck } from 'lucide-react';
import { TemplateId } from '../types/resume';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TemplateSelectorProps {
  selectedId: TemplateId;
  onSelect: (id: TemplateId) => void;
  atsSafeMode: boolean;
}

const TEMPLATES = [
  {
    id: 'ats-minimal',
    name: 'ATS Minimalist',
    description: 'Ultra-safe, single-column design perfect for large companies.',
    type: 'ATS-Friendly',
    previewColor: 'bg-slate-100',
  },
  {
    id: 'modern-premium',
    name: 'Modern Premium',
    description: 'Elegant glassmorphism-inspired layout for tech and startups.',
    type: 'Designer Choice',
    previewColor: 'bg-primary-500/10',
  },
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    description: 'Conservative and formal serif design for Law and Finance.',
    type: 'Executive',
    previewColor: 'bg-slate-200',
  },
  {
    id: 'creative-minimalist',
    name: 'Creative Minimalist',
    description: 'Bold asymmetric layout with progress bars for creative roles.',
    type: 'Creative',
    previewColor: 'bg-primary-50',
  },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedId,
  onSelect,
  atsSafeMode,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Select Template</h2>
        <p className="text-slate-400 text-sm">Choose a design that best fits your career stage and industry.</p>
      </div>

      {atsSafeMode && (
        <div className="bg-primary-500/10 border border-primary-500/20 rounded-2xl p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
          <p className="text-sm text-primary-200 leading-relaxed">
            <span className="font-bold">ATS Safe Mode is Active.</span> We've locked your template to the most compatible design. Toggle it off in the sidebar to use original designs.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {TEMPLATES.map((template) => {
          const isSelected = selectedId === template.id;
          const isDisabled = atsSafeMode && template.id !== 'ats-minimal';

          return (
            <button
              key={template.id}
              disabled={isDisabled}
              onClick={() => onSelect(template.id as TemplateId)}
              className={cn(
                "glass-card p-5 text-left transition-all duration-300 relative group",
                isSelected && "ring-2 ring-primary-500 border-primary-500/50",
                isDisabled && "opacity-40 cursor-not-allowed hover:bg-transparent"
              )}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 bg-primary-500 rounded-full p-1 shadow-lg shadow-primary-500/50">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              <div className={cn(
                "w-full aspect-[4/3] rounded-lg mb-4 flex items-center justify-center border border-white/5 bg-slate-900 group-hover:scale-[1.02] transition-transform",
              )}>
                <Layout className={cn(
                  "w-12 h-12",
                  isSelected ? "text-primary-400" : "text-slate-700"
                )} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-base">{template.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {template.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {template.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
