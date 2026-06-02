"use client";

import { motion } from "framer-motion";

export function VoiceOrb({ isListening, isSpeaking }: { isListening: boolean, isSpeaking: boolean }) {
  // A glowing orb that pulses based on state
  return (
    <div className="relative flex items-center justify-center w-48 h-48 mx-auto my-12">
      {/* Outer glow */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl"
        animate={{
          scale: isSpeaking ? [1, 1.2, 1] : isListening ? [1, 1.05, 1] : 1,
          opacity: isSpeaking ? [0.5, 0.8, 0.5] : isListening ? [0.3, 0.5, 0.3] : 0.2
        }}
        transition={{ duration: isSpeaking ? 0.8 : 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Core */}
      <motion.div 
        className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 shadow-lg shadow-amber-500/50"
        animate={{
          scale: isSpeaking ? [1, 1.05, 1] : 1,
        }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ripple effects when speaking */}
      {isSpeaking && (
        <>
          <motion.div 
            className="absolute inset-0 rounded-full border border-amber-400/30"
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full border border-amber-400/20"
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          />
        </>
      )}
    </div>
  );
}
