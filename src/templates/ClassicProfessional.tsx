import React from 'react';
import { ResumeData } from '../types/resume';

interface ClassicProfessionalProps {
  data: ResumeData;
}

export const ClassicProfessional: React.FC<ClassicProfessionalProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="bg-white text-slate-900 p-12 font-serif leading-relaxed min-h-[11in] w-[8.5in] mx-auto shadow-2xl selectable-text border-[12px] border-slate-50">
      {/* Header */}
      <header className="text-center mb-10 pb-6 border-b-2 border-slate-200">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-3 text-slate-800">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 mb-4">
          {personalInfo.jobTitle}
        </p>
        <div className="text-xs flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-600 font-sans">
          {personalInfo.email && <span className="flex items-center gap-1">• {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1">• {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1">• {personalInfo.location}</span>}
          {personalInfo.website && <span className="flex items-center gap-1">• {personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 text-center">
            Professional Profile
          </h2>
          <p className="text-sm text-center max-w-2xl mx-auto italic leading-loose">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 border-b border-slate-100 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg text-slate-800">{exp.position}</h3>
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-sm italic text-slate-600 mb-3">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <ul className="space-y-2 ml-4">
                  {exp.description.split('\n').map((bullet, i) => (
                    bullet.trim() && (
                      <li key={i} className="text-sm list-disc pl-2 marker:text-slate-300">
                        {bullet.trim()}
                      </li>
                    )
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 border-b border-slate-100 pb-2">
            Education & Academic Background
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-bold text-slate-800">{edu.school}</h3>
                  <p className="text-sm text-slate-600">{edu.degree} in {edu.field}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-500">{edu.startDate} – {edu.endDate}</p>
                  <p className="text-xs italic text-slate-400">{edu.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 border-b border-slate-100 pb-2">
            Key Competencies
          </h2>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {skills.map((s) => (
              <div key={s.id} className="text-sm flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="font-bold">{s.name}</span>
                <span className="text-[10px] text-slate-400 italic">({s.level})</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
