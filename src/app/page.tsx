"use client";

import { useChat } from "ai/react";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { CenterPanel } from "@/components/layout/CenterPanel";
import { RightPanel } from "@/components/layout/RightPanel";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: '/api/chat',
  });

  return (
    <main className="h-screen w-full flex overflow-hidden bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-800 selection:text-zinc-50">
      <div className="w-[280px] lg:w-[320px] shrink-0 hidden md:block border-r border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl z-10">
        <LeftPanel />
      </div>
      
      <div className="flex-1 min-w-0 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-zinc-950 to-zinc-950">
        <CenterPanel 
          messages={messages} 
          input={input} 
          handleInputChange={handleInputChange} 
          handleSubmit={handleSubmit} 
          isLoading={isLoading}
          stop={stop}
        />
      </div>
      
      <div className="w-[280px] lg:w-[320px] shrink-0 hidden xl:block border-l border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl z-10">
        <RightPanel messages={messages} isLoading={isLoading} />
      </div>
    </main>
  );
}
