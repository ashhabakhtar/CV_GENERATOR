import React from 'react';
import { ResumeData } from '../types/resume';

interface CreativeMinimalistProps {
  data: ResumeData;
}

export const CreativeMinimalist: React.FC<CreativeMinimalistProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="bg-white text-slate-800 font-sans min-h-[11in] w-[8.5in] mx-auto shadow-2xl flex overflow-hidden">
      {/* Left Accent Bar */}
      <div className="w-4 bg-primary-600 h-full" />
      
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-50 p-10 flex flex-col gap-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight mb-2 tracking-tighter">
            {personalInfo.fullName.split(' ')[0]}
            <br />
            <span className="text-primary-600">{personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{personalInfo.jobTitle}</p>
        </div>

        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-4 border-b-2 border-primary-500 w-fit pb-1">
            Contact
          </h2>
          <div className="space-y-4 text-xs font-medium text-slate-600">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest text-slate-400">Email</span>
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest text-slate-400">Phone</span>
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest text-slate-400">Location</span>
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest text-slate-400">Web</span>
              <span className="break-all">{personalInfo.website}</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-4 border-b-2 border-primary-500 w-fit pb-1">
            Skills
          </h2>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.id} className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-700">
                  <span>{skill.name}</span>
                  <span className="text-primary-500">{skill.level}</span>
                </div>
                <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500" 
                    style={{ width: skill.level === 'Expert' ? '100%' : skill.level === 'Intermediate' ? '70%' : '40%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 mb-4 border-b-2 border-primary-500 w-fit pb-1">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-1 text-xs">
                <p className="font-bold text-slate-900">{edu.degree}</p>
                <p className="text-slate-600">{edu.school}</p>
                <p className="text-[10px] text-slate-400 font-bold">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 bg-white flex flex-col gap-12">
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">About Me</h2>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {personalInfo.summary}
          </p>
        </section>

        <section className="flex-1">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Work History</h2>
          <div className="space-y-10">
            {experience.map((exp) => (
              <div key={exp.id} className="relative group">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors">
                    {exp.position}
                  </h3>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-primary-600 underline decoration-2 underline-offset-4 decoration-primary-200">
                    {exp.company}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{exp.location}</span>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((bullet, i) => (
                    bullet && (
                      <li key={i} className="text-xs text-slate-600 leading-snug pl-4 border-l-2 border-slate-100 group-hover:border-primary-200 transition-colors">
                        {bullet}
                      </li>
                    )
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
