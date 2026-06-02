"use client";

import { Brain, Clock } from "lucide-react";
import { Message } from "ai";

export function RightPanel({ messages, isLoading }: { messages: Message[], isLoading: boolean }) {
  // Extract all thoughts from assistant messages
  const thoughts = messages
    .filter(m => m.role === 'assistant')
    .map(m => {
      const match = m.content.match(/<thought>([\s\S]*?)(?:<\/thought>|$)/);
      return match ? match[1].trim() : null;
    })
    .filter(Boolean);

  const latestThought = thoughts.length > 0 ? thoughts[thoughts.length - 1] : "Awaiting student input to begin cognitive processing...";

  return (
    <div className="flex flex-col h-full p-5 space-y-8 overflow-y-auto">
      
      {/* Active Session Info */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-zinc-400">Nemotron-Ultra Online</span>
        </div>
      </div>

      {/* Focus Timer */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <Clock className="w-3.5 h-3.5" /> Session
        </h2>
        <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800/50 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="text-4xl font-light text-zinc-100 tracking-wider mb-2 font-mono tabular-nums">
            42:15
          </div>
          <span className="text-xs text-zinc-500 uppercase tracking-widest">Deep Work Block</span>
        </div>
      </section>

      {/* Internal Monologue (Mentor's Mind) */}
      <section className="space-y-4 flex-1 flex flex-col min-h-0">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <Brain className="w-3.5 h-3.5" /> Mentor&apos;s Mind
        </h2>
        <div className="flex-1 bg-zinc-900/30 rounded-xl border border-zinc-800/50 p-4 overflow-y-auto flex flex-col font-mono text-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800/50">
            <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
            <span className="text-zinc-500 uppercase tracking-wider">Cognitive Trace</span>
          </div>
          
          <div className="space-y-4 text-zinc-400 leading-relaxed whitespace-pre-wrap">
            {latestThought}
          </div>

          {isLoading && (
            <div className="mt-4 flex items-center gap-2 text-zinc-500">
              <Brain className="w-3.5 h-3.5 animate-pulse" />
              <span className="animate-pulse">Synthesizing response...</span>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
