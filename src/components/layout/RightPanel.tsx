"use client";

import { Brain, Clock, Activity } from "lucide-react";

export function RightPanel() {
  return (
    <div className="flex flex-col h-full bg-slate-800/50 border-l border-slate-700 p-4 space-y-6 overflow-y-auto">
      
      {/* Mentor's Mind (Internal Monologue) */}
      <section className="space-y-3">
        <h2 className="flex items-center text-sm font-semibold text-amber-500/80 uppercase tracking-wider">
          <Brain className="w-4 h-4 mr-2" />
          Mentor&apos;s Mind
        </h2>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-500 leading-relaxed">
          <p>{`> Analyzing student input...`}</p>
          <p>{`> Detected slight hesitation on "softmax".`}</p>
          <p>{`> Adjusting plan: Introduce a simpler analogy before proceeding to code implementation.`}</p>
          <p className="animate-pulse mt-2">{`> Generating response...`}</p>
        </div>
      </section>

      {/* Pomodoro / Focus Timer */}
      <section className="space-y-3">
        <h2 className="flex items-center text-sm font-semibold text-slate-400 uppercase tracking-wider">
          <Clock className="w-4 h-4 mr-2" />
          Focus Session
        </h2>
        <div className="bg-slate-800 rounded-xl p-6 flex flex-col items-center justify-center">
          <div className="text-4xl font-light text-amber-400 tracking-widest mb-2">
            42:15
          </div>
          <span className="text-xs text-slate-400 uppercase tracking-widest">Deep Work</span>
        </div>
      </section>

      {/* Timeline / Continuous Memory */}
      <section className="space-y-3 flex-1">
        <h2 className="flex items-center text-sm font-semibold text-slate-400 uppercase tracking-wider">
          <Activity className="w-4 h-4 mr-2" />
          Session Timeline
        </h2>
        <div className="relative pl-4 border-l-2 border-slate-700 space-y-4 text-sm mt-4">
          <div className="relative">
            <span className="absolute -left-[21px] w-3 h-3 bg-slate-700 rounded-full"></span>
            <p className="text-slate-300">Session Started</p>
            <span className="text-xs text-slate-500">10:00 AM</span>
          </div>
          <div className="relative">
            <span className="absolute -left-[21px] w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></span>
            <p className="text-slate-300">Reviewed Attention Mechanism</p>
            <span className="text-xs text-slate-500">10:15 AM</span>
          </div>
        </div>
      </section>

    </div>
  );
}
