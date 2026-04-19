import React from 'react';
import { Search, CheckCircle2, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';
import { ResumeData, ATSAnalysis } from '../types/resume';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ATSCheckerProps {
  jobDescription: string;
  setJobDescription: (val: string) => void;
  analysis: ATSAnalysis;
}

export const ATSChecker: React.FC<ATSCheckerProps> = ({
  jobDescription,
  setJobDescription,
  analysis,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/10 border-green-500/20';
    if (score >= 50) return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary-400" />
          ATS Optimizer
        </h2>
        <p className="text-slate-400 text-sm">Compare your resume against a job description to see your match score.</p>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
          Paste Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the target job description here..."
          className="w-full bg-slate-900 border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all min-h-[150px] resize-none"
        />
      </div>

      {jobDescription && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Score Card */}
          <div className={cn("glass-card p-8 border flex flex-col items-center justify-center text-center", getScoreBg(analysis.score))}>
            <div className="relative mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-white/5"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={364.4}
                  strokeDashoffset={364.4 - (364.4 * analysis.score) / 100}
                  className={cn("transition-all duration-1000 ease-out", getScoreColor(analysis.score))}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-3xl font-black", getScoreColor(analysis.score))}>{analysis.score}%</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Match</span>
              </div>
            </div>
            <h3 className="font-bold text-white text-lg mb-1">ATS Compatibility</h3>
            <p className="text-xs text-slate-400 leading-relaxed px-4">
              {analysis.score >= 80 ? "Excellent! Your resume is highly optimized for this role." : 
               analysis.score >= 50 ? "Good start! Add more keywords to improve your chances." :
               "Needs Work. Your resume is missing critical elements for this job."}
            </p>
          </div>

          {/* Keyword Insights */}
          <div className="glass-card p-6 border border-white/5 space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-green-400" />
                Keywords Matched
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.matchedKeywords.length > 0 ? (
                  analysis.matchedKeywords.map(k => (
                    <span key={k} className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold rounded">
                      {k}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-600 italic">No matches found yet.</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <AlertCircle className="w-3 h-3 text-red-400" />
                Missing Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.length > 0 ? (
                  analysis.missingKeywords.map(k => (
                    <span key={k} className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold rounded">
                      {k}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-600 italic">Looking good! No major missing skills.</span>
                )}
              </div>
            </div>
          </div>

          {/* Formatting Audit */}
          <div className="glass-card p-6 border border-white/5 md:col-span-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Structural Audit</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysis.formattingAlerts.length > 0 ? (
                analysis.formattingAlerts.map((alert, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-400 leading-snug">{alert}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-start gap-3 p-3 bg-green-500/5 border border-green-500/10 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-400">All structural checks passed.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
