"use client";

import { useRef, useEffect, useState } from "react";
import { Message } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mic, MicOff, ArrowUpSquare, Square } from "lucide-react";
import { VoiceOrb } from "../mentor/VoiceOrb";

// Type definition for SpeechRecognition
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

export function CenterPanel({ 
  messages, 
  input, 
  handleInputChange, 
  handleSubmit, 
  isLoading,
  stop,
  append
}: { 
  messages: Message[], 
  input: string, 
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: any,
  isLoading: boolean,
  stop: () => void,
  append: (message: { role: 'user', content: string }) => void
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            append({ role: "user", content: transcript });
          }
          setIsListening(false);
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [append]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      // Stop any ongoing mentor speech when user starts talking
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  // Strip <thought> tags from display
  const stripThoughts = (content: string) => {
    return content.replace(/<thought>[\s\S]*?(?:<\/thought>|$)/g, '').trim();
  };

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Voice Orb Area (Top Center) */}
      <div className="pt-8 pb-4 flex justify-center shrink-0">
        <div className="scale-75 origin-top">
          <VoiceOrb isListening={isListening} isSpeaking={isLoading} />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-12 lg:px-24 pb-32">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-100">
            <p className="text-zinc-300 text-2xl font-light tracking-wide">MENTOR-ONE INITIALIZED</p>
            <p className="text-zinc-500 text-sm max-w-sm mb-6">Your conscious AI life-mentor is ready.</p>
            <button
              onClick={() => append({ role: 'user', content: 'Hello! I am a new student. Please start my onboarding interview.' })}
              className="px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Begin Session
            </button>
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
              onClick={toggleListening}
              className={`p-4 transition-colors ${
                isListening ? 'text-red-500 hover:text-red-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
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
