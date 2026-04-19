import React from 'react';
import { motion } from 'framer-motion';
import { ResumeData } from '../types/resume';

interface ModernPremiumProps {
  data: ResumeData;
}

export const ModernPremium: React.FC<ModernPremiumProps> = ({ data }) => {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="bg-white text-slate-800 p-0 font-sans min-h-[11in] w-[8.5in] mx-auto shadow-2xl flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-900 text-white p-8">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-2">
            {personalInfo.fullName.split(' ')[0]}<br/>
            <span className="text-primary-400">{personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{personalInfo.jobTitle}</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400 mb-4">Contact</h2>
            <div className="space-y-3 text-xs text-slate-300">
              <p>{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.location}</p>
              <p className="break-all">{personalInfo.website}</p>
            </div>
          </section>

          <section>
            <h3 className="text-primary-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Skills</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-[10px] font-bold text-white mb-2">
                    <span>{skill.name}</span>
                    <span className="text-white/40">{skill.rating || 3}/5</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(skill.rating || 3) * 20}%` }}
                      className="h-full bg-gradient-to-r from-primary-400 to-indigo-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400 mb-4">Education</h2>
            <div className="space-y-4 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-bold">{edu.degree}</p>
                  <p className="text-slate-400">{edu.school}</p>
                  <p className="text-slate-500">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-slate-50">
        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Profile</h2>
          <p className="text-sm text-slate-600 leading-relaxed italic border-l-4 border-primary-500 pl-4">
            {personalInfo.summary}
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-primary-500 before:rounded-full after:content-[''] after:absolute after:left-[3px] after:top-4 after:bottom-[-20px] after:w-[2px] after:bg-slate-200 last:after:hidden">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-slate-900">{exp.position}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs font-bold text-primary-600 mb-3 uppercase tracking-tighter">{exp.company} • {exp.location}</p>
                <ul className="space-y-2">
                  {exp.description.split('\n').map((bullet, i) => (
                    bullet.trim() && (
                      <li key={i} className="text-xs text-slate-600 leading-snug">
                        {bullet.trim()}
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
