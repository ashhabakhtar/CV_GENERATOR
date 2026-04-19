import React from 'react';
import { ResumeData } from '../types/resume';

interface ATSMinimalProps {
  data: ResumeData;
}

export const ATSMinimal: React.FC<ATSMinimalProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="bg-white text-black p-8 font-serif leading-normal min-h-[11in] w-[8.5in] mx-auto shadow-2xl selectable-text">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase mb-1">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <div className="text-sm flex flex-wrap justify-center gap-x-3 text-slate-700">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Professional Summary</h2>
          <p className="text-sm text-justify">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-sm">
                  <span>{exp.position}</span>
                  <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="flex justify-between italic text-sm mb-1">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <ul className="list-disc list-inside text-sm space-y-0.5 ml-2">
                  {exp.description.map((bullet, i) => (
                    bullet && <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between font-bold text-sm">
                  <span>{edu.school}</span>
                  <span>{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="flex justify-between italic text-sm">
                  <span>{edu.degree} in {edu.field}</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Skills</h2>
          <div className="text-sm">
            <span className="font-bold">Technical Skills: </span>
            {skills.map((s, i) => (
              <span key={s.id}>{s.name}{i < skills.length - 1 ? ', ' : ''}</span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Projects</h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold text-sm">
                  <span>{proj.name}</span>
                  {proj.link && <span>{proj.link}</span>}
                </div>
                <p className="text-sm">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
