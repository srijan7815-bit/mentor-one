"use client";

import { motion } from "framer-motion";

export function VoiceOrb({ isListening, isSpeaking }: { isListening: boolean, isSpeaking: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-32 h-32 mx-auto">
      {/* Outer glow */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-zinc-500/10 blur-xl"
        animate={{
          scale: isSpeaking ? [1, 1.2, 1] : isListening ? [1, 1.05, 1] : 1,
          opacity: isSpeaking ? [0.4, 0.6, 0.4] : isListening ? [0.3, 0.5, 0.3] : 0.2
        }}
        transition={{ duration: isSpeaking ? 0.8 : 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Core */}
      <motion.div 
        className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-700 shadow-[0_0_30px_rgba(161,161,170,0.2)]"
        animate={{
          scale: isSpeaking ? [1, 1.05, 1] : 1,
        }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ripple effects when speaking */}
      {isSpeaking && (
        <>
          <motion.div 
            className="absolute inset-0 rounded-full border border-zinc-400/20"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full border border-zinc-400/10"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          />
        </>
      )}
    </div>
  );
}
