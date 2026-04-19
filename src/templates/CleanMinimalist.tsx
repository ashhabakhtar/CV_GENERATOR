import React from 'react';
import { ResumeData } from '../types/resume';

interface CleanMinimalistProps {
  data: ResumeData;
}

export const CleanMinimalist: React.FC<CleanMinimalistProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="bg-white text-slate-900 p-16 font-sans min-h-[11in] w-[8.5in] mx-auto shadow-2xl flex flex-col gap-12">
      {/* Header */}
      <header className="flex justify-between items-start border-b-4 border-slate-900 pb-8">
        <div className="flex-1">
          <h1 className="text-5xl font-black tracking-tight mb-2 uppercase leading-none">
            {personalInfo.fullName || 'NAME'}
          </h1>
          <p className="text-xl font-bold text-slate-400 lowercase tracking-widest leading-none italic">
            {personalInfo.jobTitle}
          </p>
        </div>
        <div className="text-right text-[10px] font-black uppercase tracking-[0.2em] space-y-1.5 text-slate-500">
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
          {personalInfo.website && <p className="text-slate-800 border-b border-slate-800 w-fit ml-auto">{personalInfo.website.replace(/^https?:\/\//, '')}</p>}
        </div>
      </header>

      {/* Summary */}
      <section className="grid grid-cols-[120px_1fr] gap-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">About</h2>
        <p className="text-sm leading-relaxed font-medium text-slate-600">
          {personalInfo.summary}
        </p>
      </section>

      {/* Experience */}
      <section className="grid grid-cols-[120px_1fr] gap-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Work</h2>
        <div className="space-y-10">
          {experience.map((exp) => (
            <div key={exp.id} className="space-y-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-black tracking-tight text-slate-900">{exp.position}</h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span>{exp.company}</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span>{exp.location}</span>
              </div>
              <ul className="space-y-1.5">
                {exp.description.split('\n').map((bullet, i) => (
                  bullet.trim() && (
                    <li key={i} className="text-xs text-slate-500 leading-snug flex gap-3">
                      <span className="text-slate-200 select-none">//</span>
                      {bullet.trim()}
                    </li>
                  )
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="grid grid-cols-[120px_1fr] gap-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Studies</h2>
        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-black text-slate-900">{edu.degree}</h3>
                <p className="text-xs font-bold text-slate-500 italic">{edu.school}</p>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                {edu.startDate} – {edu.endDate}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="grid grid-cols-[120px_1fr] gap-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Expertise</h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800 uppercase tracking-tighter">{skill.name}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((p) => (
                  <div 
                    key={p} 
                    className={`h-4 w-1 ${p <= (skill.rating || 3) ? 'bg-slate-900' : 'bg-slate-100'}`} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
