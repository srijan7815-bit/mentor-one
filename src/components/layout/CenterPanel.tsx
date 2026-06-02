"use client";

import { useState } from "react";
import { VoiceOrb } from "../mentor/VoiceOrb";
import { Mic, MicOff, Settings, Book } from "lucide-react";

export function CenterPanel() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const toggleListening = () => setIsListening(!isListening);
  
  // Fake mentor speaking trigger for demo purposes
  const simulateMentor = () => {
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 5000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 relative">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-amber-500">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-sm font-medium tracking-wider uppercase">Nemotron-Ultra Active</span>
        </div>
        <button className="text-slate-400 hover:text-slate-200 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Main Voice Interaction Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <VoiceOrb isListening={isListening} isSpeaking={isSpeaking} />
        
        {/* Live Transcripts */}
        <div className="w-full max-w-2xl mt-12 space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-2xl rounded-tl-sm border border-slate-700/50">
            <p className="text-slate-300 text-lg leading-relaxed">
              So, how does the query vector actually interact with the key vector in the attention formula?
            </p>
          </div>
          
          <div className="bg-amber-900/10 p-6 rounded-2xl rounded-tr-sm border border-amber-500/20 ml-12">
            <p className="text-amber-100/90 text-lg leading-relaxed">
              Great question. Think of the Query as what you&apos;re looking for, and the Key as what the data holds. We take the dot product of the two. If they align well, the score is higher, meaning we should pay more attention to that specific Value.
            </p>
          </div>
        </div>
      </div>

      {/* Resource Viewer Panel (Bottom Collapsible) */}
      <div className="h-64 bg-slate-950 border-t border-slate-800 p-4 flex flex-col">
        <div className="flex items-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          <Book className="w-4 h-4 mr-2" />
          Active Resource: Attention Is All You Need (Section 3.2.1)
        </div>
        <div className="flex-1 bg-slate-900 rounded-lg border border-slate-800 p-6 overflow-y-auto font-serif text-slate-300">
          <p className="text-xl mb-4">Scaled Dot-Product Attention</p>
          <p className="leading-relaxed">
            We call our particular attention &quot;Scaled Dot-Product Attention&quot;. The input consists of queries and keys of dimension 
            d_k, and values of dimension d_v. We compute the dot products of the query with all keys, divide each by sqrt(d_k), 
            and apply a softmax function to obtain the weights on the values.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button 
          onClick={toggleListening}
          className={`p-4 rounded-full shadow-lg transition-all ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
              : 'bg-slate-700 hover:bg-slate-600 shadow-black/50'
          }`}
        >
          {isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
        </button>
        <button 
          onClick={simulateMentor}
          className="px-4 py-2 bg-slate-800 text-xs text-slate-400 rounded-full hover:bg-slate-700"
        >
          Simulate Mentor Voice
        </button>
      </div>

    </div>
  );
}
