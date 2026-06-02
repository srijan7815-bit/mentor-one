"use client";

import { User, Map, Code2, Database, BrainCircuit, Activity } from "lucide-react";

export function LeftPanel() {
  return (
    <div className="flex flex-col h-full p-5 space-y-8 overflow-y-auto">
      
      {/* Brand Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
          <BrainCircuit className="w-5 h-5 text-zinc-950" />
        </div>
        <h1 className="font-semibold tracking-tight text-zinc-100">MENTOR-ONE</h1>
      </div>

      {/* Student Profile */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <User className="w-3.5 h-3.5" /> Identity Core
        </h2>
        <div className="bg-zinc-900/50 rounded-xl p-4 space-y-3 border border-zinc-800/50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-400">Name</span>
            <span className="text-sm font-medium text-zinc-200">Alex</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-400">Focus</span>
            <span className="text-sm font-medium text-zinc-200">AI Architecture</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-400">State</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-sm font-medium text-zinc-200">Deep Work</span>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Roadmap */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <Map className="w-3.5 h-3.5" /> Curriculum
        </h2>
        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-xs text-zinc-400 mb-1">Current Module</p>
              <p className="text-sm font-medium text-zinc-200">Large Language Models</p>
            </div>
            <span className="text-xs font-mono text-zinc-500">68%</span>
          </div>
          
          <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-5 overflow-hidden">
            <div className="bg-zinc-300 h-1.5 rounded-full w-[68%] relative">
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Database className="w-4 h-4 text-zinc-600 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-500 line-through">Vector Embeddings</p>
              </div>
            </li>
            <li className="flex items-start gap-3 relative">
              <Code2 className="w-4 h-4 text-zinc-200 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-200 font-medium">Attention Mechanisms</p>
                <p className="text-xs text-zinc-500 mt-0.5">Current focus area</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-4 h-4 text-zinc-600 mt-0.5" />
              <div>
                <p className="text-sm text-zinc-600">Model Fine-Tuning</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
