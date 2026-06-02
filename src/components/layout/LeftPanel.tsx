"use client";

import { User, Map, BookOpen } from "lucide-react";

export function LeftPanel() {
  return (
    <div className="flex flex-col h-full bg-slate-800/50 border-r border-slate-700 p-4 space-y-6 overflow-y-auto">
      
      {/* Student Profile */}
      <section className="space-y-3">
        <h2 className="flex items-center text-sm font-semibold text-slate-400 uppercase tracking-wider">
          <User className="w-4 h-4 mr-2" />
          Student Profile
        </h2>
        <div className="bg-slate-800 rounded-xl p-4 space-y-2 text-sm">
          <p><span className="text-slate-400">Name:</span> Alex</p>
          <p><span className="text-slate-400">Focus:</span> Advanced AI Systems</p>
          <p><span className="text-slate-400">Energy:</span> High</p>
        </div>
      </section>

      {/* Roadmap Progress */}
      <section className="space-y-3">
        <h2 className="flex items-center text-sm font-semibold text-slate-400 uppercase tracking-wider">
          <Map className="w-4 h-4 mr-2" />
          Roadmap
        </h2>
        <div className="bg-slate-800 rounded-xl p-4 text-sm">
          <div className="flex justify-between mb-2">
            <span>Phase 3: Deep Learning</span>
            <span className="text-amber-400">45%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <ul className="mt-4 space-y-2 text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Backpropagation
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Transformers (Current)
            </li>
            <li className="flex items-center gap-2 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-slate-600"></span>
              RLHF
            </li>
          </ul>
        </div>
      </section>

      {/* Mentor's Private Notes */}
      <section className="space-y-3 flex-1">
        <h2 className="flex items-center text-sm font-semibold text-slate-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 mr-2" />
          Mentor&apos;s Private Notes
        </h2>
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-sm font-mono text-slate-400 h-full max-h-64 overflow-y-auto">
          <p className="mb-2">Observed user struggling with QKV attention math last session. Need to break it down visually today.</p>
          <p className="mb-2">User seems rested. Pushing for a 90-minute deep work block.</p>
        </div>
      </section>

    </div>
  );
}
