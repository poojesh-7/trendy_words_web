import Image from "next/image";
import Link from "next/link";
import Card from "@/components/Card";
import WordCard from "@/components/main/WordCard";
import SignupButton from "@/components/SignupButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TrendyWords | Where Slang Becomes Culture",
  description:
    "Discover, share, and vibe with the trendiest Gen Z words of today. Stay ahead of the trend curve on TrendyWords!",
};

interface Word {
  id: number;
  trendy_word: string;
  alter_word: string;
  emoji?: string;
}

const sectionWrapper =
  "flex flex-col px-6 py-12 lg:py-24 justify-around items-center lg:flex-row max-w-7xl mx-auto gap-12 overflow-hidden";
const imageContainer = "relative w-full max-w-[500px] aspect-square sm:aspect-[5/4] lg:aspect-square";

export default function Home() {
  const words: Word[] = [
    { id: 1, trendy_word: "Lit", alter_word: "Exciting", emoji: "🔥" },
    { id: 2, trendy_word: "Salty", alter_word: "Upset", emoji: "🧂" },
    { id: 3, trendy_word: "Flex", alter_word: "Show off", emoji: "💪" },
    { id: 4, trendy_word: "Ghost", alter_word: "Ignore", emoji: "👻" },
    { id: 5, trendy_word: "Vibe", alter_word: "Mood", emoji: "🌊" },
    { id: 6, trendy_word: "Cap", alter_word: "Lie", emoji: "🧢" },
    { id: 7, trendy_word: "Bet", alter_word: "Okay/Deal", emoji: "🤝" },
    { id: 8, trendy_word: "Lowkey", alter_word: "Secretly", emoji: "🤫" },
    { id: 9, trendy_word: "GOAT", alter_word: "Best", emoji: "🐐" },
  ];

  return (
    <main className="bg-slate-50 min-h-screen font-sans selection:bg-cyan-100 selection:text-cyan-900">
      <section className={`${sectionWrapper} pt-24 lg:pt-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out`}>
        <div className="flex-1 max-w-2xl text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Trending Now
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
            Trendy<span className="text-cyan-600">Words</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
            Where Slang Becomes Culture. Discover, share, and vibe with the trendiest words of today.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-3 mt-8 mb-10 group">
            <p className="text-slate-400 font-semibold uppercase tracking-widest text-[10px] sm:text-xs">Evolving From</p>
            <div className="flex items-center bg-white border border-slate-200 shadow-sm px-3 sm:px-4 py-2 rounded-2xl gap-2 hover:border-cyan-200 transition-colors">
              <span className="font-bold text-slate-400 line-through text-sm sm:text-base">lit</span>
              <span className="text-cyan-500">→</span>
              <span className="font-black text-cyan-600 text-sm sm:text-base">sus</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div className="w-full sm:w-auto">
              <SignupButton />
            </div>
            <Link href="/words" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full px-8 py-4 text-slate-700 font-bold bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Explore words
              </button>
            </Link>
          </div>
        </div>

        <div className={`${imageContainer} order-1 lg:order-2 animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both`}>
          <div className="absolute inset-0 bg-cyan-200 rounded-[2rem] rotate-3 scale-95 -z-10 opacity-50" />
          <Image
            src="https://i.ibb.co/jtyGy3F/hero.webp"     
            fill
            className="object-cover rounded-[2rem] shadow-2xl border-4 border-white"
            alt="People exploring trendy words"
            priority
          />
        </div>
      </section>

      <section className="bg-white border-y border-slate-100">
        <div className={`${sectionWrapper} lg:flex-row-reverse`}>
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">
              Stay Ahead of the <br />
              <span className="text-cyan-500 underline decoration-cyan-200 underline-offset-8">Trend Curve</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-colors group">
                <h3 className="font-black text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors text-lg">Discover</h3>
                <p className="text-sm text-slate-600 leading-snug">Browse a massive collection of Gen Z slang and cultural nuances.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-colors group">
                <h3 className="font-black text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors text-lg">Contribute</h3>
                <p className="text-sm text-slate-600 leading-snug">Share your favorite words and let the world know what's vibin'.</p>
              </div>
            </div>
          </div>

          <div className={`${imageContainer}`}>
             <Image
                src="https://i.ibb.co/qHDzjZT/about-section.jpg"
                alt="About section"
                fill
                className="object-cover rounded-[2rem] shadow-lg grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
              />
          </div>
        </div>
      </section>

      <section className={sectionWrapper}>
        <div className="flex-1 py-4 lg:py-8 w-full">
          <span className="text-cyan-600 font-black text-sm uppercase tracking-widest mb-4 block text-center lg:text-left">Process</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-12 text-center lg:text-left">How it works</h2>

          <div className="space-y-12 relative before:absolute before:left-4 lg:before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            {[
              { step: "Step 1", title: "Sign up in seconds", desc: "Create your account faster than you can say “bruh.”" },
              { step: "Step 2", title: "Explore or add words", desc: "Scroll through a curated list of slang, or drop your own flex." },
              { step: "Step 3", title: "Connect", desc: "See what others are vibin' with and stay woke with the trends." }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-12 group">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center font-bold text-xs text-slate-400 group-hover:border-cyan-500 group-hover:text-cyan-500 transition-all">
                  {idx + 1}
                </div>
                <h4 className="font-black text-xl text-slate-800 mb-1">{item.title}</h4>
                <p className="text-slate-500 max-w-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={imageContainer}>
          <Image
            src="https://i.ibb.co/zVYqMD3M/thinking.webp"
            fill
            className="object-cover rounded-[2rem] shadow-xl hover:-rotate-2 transition-transform duration-500"
            alt="Person thinking"
          />
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-balck mb-4 leading-tight">
            What’s <span className="text-cyan-400 italic">Vibin’</span> Right Now
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">Fresh slang straight from the streets of the internet.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {words.map((item, i) => (
            <div
              key={item.id}
              className="hover:scale-[1.02] transition-transform duration-300 flex justify-center"
            >
              <WordCard
                trendy_word={item.trendy_word}
                alter_word={item.alter_word}
                emoji={item.emoji}
                needMargin={false}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}