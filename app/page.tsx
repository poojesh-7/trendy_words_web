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
}

const sectionWrapper =
  "flex flex-col p-[30px] justify-around items-center lg:h-[650px] lg:flex-row overflow-hidden";
const imageContainer = "relative w-[500px] h-[400px]";

export default function Home() {
  const words: Word[] = [
    { id: 1, trendy_word: "Lit", alter_word: "Exciting" },
    { id: 2, trendy_word: "Salty", alter_word: "Upset" },
    { id: 3, trendy_word: "Flex", alter_word: "Show off" },
    { id: 4, trendy_word: "Ghost", alter_word: "Ignore" },
    { id: 5, trendy_word: "Vibe", alter_word: "Mood" },
    { id: 6, trendy_word: "Cap", alter_word: "Lie" },
    { id: 7, trendy_word: "Bet", alter_word: "Okay/Deal" },
    { id: 8, trendy_word: "Lowkey", alter_word: "Secretly" },
    { id: 9, trendy_word: "GOAT", alter_word: "Best" },
  ];

  return (
    <>
      <section className={`${sectionWrapper} mt-[50px] animate-fade-in`}>
        <div className="p-5 text-xl lg:w-120 md:w-130 animate-slide-up">
          <h1 className="text-3xl text-black font-bold">TrendyWords</h1>
          <p className="mt-3 text-black font-medium">
            Where Slang Becomes Culture.
          </p>

          <div className="flex mt-10 mb-10 ml-30 animate-fade-in-delay">
            <p>From</p>
            <span className="bg-red-300 ml-1 px-2 rounded-md">lit → sus</span>
          </div>

          <p className="font-medium">
            Discover, share, and vibe with the trendiest words of today.
          </p>

          <div className="flex justify-between mt-20 text-lg font-bold animate-fade-in-delay2">
            <SignupButton />
            <Link href="/words">
              <button
                type="button"
                className="text-black font-bold bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 hover:scale-105 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-yellow-400 shadow-lg shadow-yellow-500/50 dark:shadow-yellow-400/80 rounded-lg text-sm px-5 py-2.5 transition-transform duration-300"
              >
                Explore words
              </button>
            </Link>
          </div>
        </div>

        <div className={`${imageContainer} animate-slide-in-right`}>
          <Image
            src="https://i.ibb.co/FL0kHmZJ/hero-section.jpg"
            fill
            className="object-cover rounded-lg"
            alt="People exploring trendy words"
            priority
          />
        </div>
      </section>

      <section className={`${sectionWrapper} animate-fade-in-delay`}>
        <div className="flex flex-col self-start animate-slide-up">
          <h2 className="text-3xl text-black font-bold mb-10">
            Stay Ahead of the Trend Curve
          </h2>
          <div className="relative w-full md:max-w-md lg:max-w-lg aspect-[5/4] mb-10">
            <Image
              src="https://i.ibb.co/qHDzjZT/about-section.jpg"
              alt="About section"
              fill
              className="object-cover rounded-md shadow-md hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="flex flex-col self-end p-[10px] space-y-3 animate-slide-in-right">
          <Card title="Discover Trends">
            Browse a collection of Gen Z words & meanings.
          </Card>
          <Card title="Add your words">
            Contribute your favorite slang and share it with the community.
          </Card>
          <Card title="Learn It. Note It. Use It">
            Pick up new slang, jot it down, and flex it in real life.
          </Card>
          <Card title="Stay Updated">
            Track what’s hot and what’s not with real-time popularity.
          </Card>
        </div>
      </section>

      <section className={`${sectionWrapper} animate-fade-in-delay2`}>
        <div className="flex flex-col min-h-[350px] justify-between animate-slide-up">
          <h2 className="text-3xl text-black font-bold">How it works</h2>

          <div>
            <p className="font-bold text-md">Step 1: Sign up in seconds</p>
            <p>Create your account faster than you can say “bruh.”</p>
          </div>
          <div>
            <p className="font-bold text-md">Step 2: Explore or add words</p>
            <p>
              Scroll through a curated list of slang, or drop your own to flex
              your creativity.
            </p>
          </div>
          <div className="mb-3">
            <p className="font-bold text-md">
              Step 3: Connect with the community
            </p>
            <p>
              See what others are vibin’ with, share receipts, and stay woke
              with the trends.
            </p>
          </div>
        </div>

        <div className={`${imageContainer} animate-slide-in-right`}>
          <Image
            src="https://i.ibb.co/zVYqMD3M/thinking.webp"
            fill
            className="object-cover rounded-lg bg-cover shadow-lg hover:scale-105 transition-transform duration-500"
            alt="Person thinking"
          />
        </div>
      </section>

      <section className="flex flex-col p-[30px] justify-around items-center overflow-hidden animate-fade-in">
        <h2 className="text-3xl text-black font-bold mb-5">
          What’s Vibin’ Right Now
        </h2>
        <p className="text-lg mb-5">Fresh slang straight from the community.</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {words.map((item, i) => (
            <div
              key={item.id}
              className={`animate-slide-up opacity-0 animation-delay-${i * 150}`}
            >
              <WordCard
                trendy_word={item.trendy_word}
                alter_word={item.alter_word}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
