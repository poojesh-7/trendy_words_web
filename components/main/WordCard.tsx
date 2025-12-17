"use client"
import React from 'react';

type WordProps = {
  trendy_word: string;
  alter_word: string;
  emoji?: string; 
  needMargin: boolean;
};

const emojis = ["🔥", "💎", "🌟", "🎯", "🚀", "🎉", "⚡", "💥", "😎"];

const WordCard = ({ trendy_word, alter_word, emoji, needMargin }: WordProps) => {
  const handleClick = () => {
    const query = encodeURIComponent(trendy_word);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  };

  const index =
    trendy_word.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    emojis.length;
  const emojiExtra = emojis[index];
  
  const marginClass = needMargin ? 'ml-[10px] mt-[20px]' : '';

  return (
    <div className={`
      relative overflow-hidden group
      bg-blue/80 backdrop-blur-sm border border-cyan-100
      min-w-[320px] p-6 rounded-2xl shadow-sm
      transition-all duration-300 ease-out
      hover:shadow-xl hover:-translate-y-2 hover:bg-white
      ${marginClass}
    `}>
      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-red-100 rounded-full blur-2xl opacity-50 group-hover:bg-cyan-200 transition-colors" />

      <div className="flex items-center justify-between relative z-10">
        <button 
          className="group/btn relative" 
          onClick={handleClick}
          title={`Search "${trendy_word}"`}
        >
          <span className="relative z-10 text-2xl font-black tracking-tight text-slate-800">
            {trendy_word}
          </span>
          {/* Animated underline effect */}
          <span className="absolute bottom-0 left-0 w-full h-2 bg-cyan-300/60 -z-10 group-hover/btn:h-full group-hover/btn:bg-green-300 transition-all duration-200" />
        </button>
        
        <div className="flex items-center justify-center w-12 h-12 bg-white shadow-inner rounded-xl text-2xl border border-slate-50">
          {!emoji ? emojiExtra : emoji}
        </div>
      </div>

      <div className="mt-6 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Definition</span>
        <p className="text-lg text-slate-700 leading-tight mt-1">
          <span className="font-semibold italic text-cyan-600">“</span>
          {alter_word}
          <span className="font-semibold italic text-cyan-600">”</span>
        </p>
      </div>
    </div>
  );
};

export default WordCard;