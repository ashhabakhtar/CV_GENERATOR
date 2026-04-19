import React from 'react';
import { ResumeData } from '../types/resume';

interface ProfessionalModernProps {
  data: ResumeData;
}

export const ProfessionalModern: React.FC<ProfessionalModernProps> = ({ data }) => {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="bg-white text-slate-800 font-sans min-h-[11in] w-[8.5in] mx-auto shadow-2xl flex flex-col">
      {/* Header Bar */}
      <header className="bg-slate-800 text-white p-8 py-10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-primary-400 font-bold tracking-widest text-sm uppercase">
            {personalInfo.jobTitle}
          </p>
        </div>
        <div className="text-right text-xs space-y-1 text-slate-300 font-medium">
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
          <p className="italic text-primary-300">{personalInfo.website}</p>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Main */}
        <main className="flex-[2] p-10 space-y-10 border-r border-slate-100">
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 border-b-2 border-slate-800 w-fit pb-1">
              Profile Summary
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 font-medium">
              {personalInfo.summary}
            </p>
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 border-b-2 border-slate-800 w-fit pb-1">
              Work Experience
            </h2>
            <div className="space-y-10">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-black text-slate-800 text-base italic">{exp.position}</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-primary-600 font-bold text-xs mb-4">{exp.company} • {exp.location}</p>
                  <ul className="space-y-2">
                    {exp.description.split('\n').map((bullet, i) => (
                      bullet.trim() && (
                        <li key={i} className="text-xs text-slate-600 leading-snug flex gap-2">
                          <span className="text-primary-500">•</span>
                          {bullet.trim()}
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="flex-1 bg-slate-50 p-10 space-y-10">
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 border-b-2 border-slate-300 w-fit pb-1">
              Skills
            </h2>
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-700">
                    <span>{skill.name}</span>
                    <span className="text-slate-400 uppercase text-[8px] tracking-widest">{skill.level}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <div 
                        key={p} 
                        className={`w-2.5 h-2.5 rounded-full ${p <= (skill.rating || 3) ? 'bg-slate-800' : 'bg-slate-200'}`} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6 border-b-2 border-slate-300 w-fit pb-1">
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <p className="text-xs font-black text-slate-800 uppercase leading-tight">{edu.degree}</p>
                  <p className="text-[10px] font-bold text-slate-500">{edu.school}</p>
                  <p className="text-[9px] font-bold text-primary-600">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};
