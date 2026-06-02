"use client";

import { useRef, useEffect } from "react";
import { Message } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mic, ArrowUpSquare, Square } from "lucide-react";
import { VoiceOrb } from "../mentor/VoiceOrb";

export function CenterPanel({ 
  messages, 
  input, 
  handleInputChange, 
  handleSubmit, 
  isLoading,
  stop
}: { 
  messages: Message[], 
  input: string, 
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: any,
  isLoading: boolean,
  stop: () => void
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Strip <thought> tags from display
  const stripThoughts = (content: string) => {
    return content.replace(/<thought>[\s\S]*?(?:<\/thought>|$)/g, '').trim();
  };

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Voice Orb Area (Top Center) */}
      <div className="pt-8 pb-4 flex justify-center shrink-0">
        <div className="scale-75 origin-top">
          <VoiceOrb isListening={false} isSpeaking={isLoading} />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-12 lg:px-24 pb-32">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <p className="text-zinc-400 text-lg">Hello, Alex.</p>
            <p className="text-zinc-500 text-sm max-w-sm">I have reviewed your progress. What area of our curriculum would you like to focus on today?</p>
          </div>
        ) : (
          <div className="space-y-8 max-w-3xl mx-auto w-full">
            {messages.map((m) => {
              const displayContent = stripThoughts(m.content);
              if (!displayContent) return null; // Don't render empty messages if it's just a thought

              return (
                <div 
                  key={m.id} 
                  className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl p-5 ${
                      m.role === 'user' 
                        ? 'bg-zinc-800 text-zinc-100 rounded-tr-sm' 
                        : 'bg-transparent text-zinc-300'
                    }`}
                  >
                    {m.role === 'assistant' && (
                      <div className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-widest">
                        Mentor
                      </div>
                    )}
                    <div className={`prose prose-invert max-w-none ${m.role === 'user' ? 'prose-p:leading-relaxed' : 'prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800'}`}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {displayContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pt-10 pb-8 px-4 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto w-full relative">
          <form 
            onSubmit={handleSubmit}
            className="relative flex items-center bg-zinc-900 border border-zinc-800/50 rounded-2xl shadow-2xl focus-within:ring-2 focus-within:ring-zinc-700 transition-all overflow-hidden"
          >
            <button 
              type="button"
              className="p-4 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask your mentor..."
              className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-600 py-4 px-2"
            />
            <div className="p-2">
              {isLoading ? (
                <button 
                  type="button"
                  onClick={stop}
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-zinc-300 transition-colors"
                >
                  <Square className="w-5 h-5 fill-current" />
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="p-2 bg-zinc-100 hover:bg-white text-zinc-900 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowUpSquare className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
          <div className="text-center mt-3">
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium">Nemotron-Ultra 253B Engine</span>
          </div>
        </div>
      </div>

    </div>
  );
}
