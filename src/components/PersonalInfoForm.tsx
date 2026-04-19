import React from 'react';
import { ResumeData } from '../types/resume';

interface PersonalInfoFormProps {
  data: ResumeData['personalInfo'];
  update: (info: Partial<ResumeData['personalInfo']>) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, update }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    update({ [name]: value });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl lg:text-2xl font-bold text-white mb-2">Personal Details</h2>
        <p className="text-slate-400 text-base md:text-sm leading-relaxed">Tell us about yourself and how recruiters can reach you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2.5">
          <label className="text-sm md:text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium"
          />
        </div>
        <div className="space-y-2.5">
          <label className="text-sm md:text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={data.jobTitle}
            onChange={handleChange}
            placeholder="Senior Software Engineer"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium"
          />
        </div>
        <div className="space-y-2.5">
          <label className="text-sm md:text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium"
          />
        </div>
        <div className="space-y-2.5">
          <label className="text-sm md:text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium"
          />
        </div>
        <div className="space-y-2.5">
          <label className="text-sm md:text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Location</label>
          <input
            type="text"
            name="location"
            value={data.location}
            onChange={handleChange}
            placeholder="New York, USA"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium"
          />
        </div>
        <div className="space-y-2.5">
          <label className="text-sm md:text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Website</label>
          <input
            type="text"
            name="website"
            value={data.website}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        <label className="text-sm md:text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Professional Summary</label>
        <textarea
          name="summary"
          value={data.summary}
          onChange={handleChange}
          rows={5}
          placeholder="Briefly describe your career goals and achievements..."
          className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-base md:text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all resize-none font-medium leading-relaxed"
        />
      </div>
    </div>
  );
};
