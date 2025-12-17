"use client";

import { useMemo, useState, useEffect } from "react";
import WordCard from "./WordCard";
import { useQuery } from "@/context/QueryProvider";
import Fuse from "fuse.js";
import { EfficientQuery } from "@/context/EfficientQuery";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface Word {
  trendy_word: string;
  alter_word?: string;
  [key: string]: any;
}

interface UserWordsProps {
  words: Word[];
}

function mergeSort(arr: Word[], order: "asc" | "desc" = "asc"): Word[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), order);
  const right = mergeSort(arr.slice(mid), order);

  return merge(left, right, order);
}

function merge(left: Word[], right: Word[], order: "asc" | "desc"): Word[] {
  const result: Word[] = [];
  while (left.length && right.length) {
    const condition =
      order === "asc"
        ? left[0].trendy_word.localeCompare(right[0].trendy_word) <= 0
        : left[0].trendy_word.localeCompare(right[0].trendy_word) >= 0;

    if (condition) result.push(left.shift()!);
    else result.push(right.shift()!);
  }
  return [...result, ...left, ...right];
}

const UserWords = ({ words }: UserWordsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [srt, setSrt] = useState<"asc" | "desc" | null>(null);
  const wordsPerPage = 6;

  const { query } = useQuery();
  const debouncedQuery = EfficientQuery(query, 300);

  const wordsWithEmoji = useMemo(() => {
    let finalWords = [...words];
    if (srt !== null) {
      finalWords = mergeSort(finalWords, srt);
    }
    const emojis = ["🔥", "✨", "💎", "🌟", "🎯", "🚀", "🎉", "⚡", "💥", "😎"];
    return finalWords.map((w, i) => ({
      ...w,
      emoji: emojis[i % emojis.length],
    }));
  }, [words, srt]);

  const fuse = useMemo(
    () =>
      new Fuse(wordsWithEmoji, {
        keys: ["trendy_word", "alter_word"],
        threshold: 0.3,
        minMatchCharLength: 2,
      }),
    [wordsWithEmoji]
  );

  const filteredWords = useMemo(() => {
    if (!debouncedQuery.trim()) return wordsWithEmoji;
    return fuse.search(debouncedQuery).map((r) => r.item);
  }, [debouncedQuery, fuse, wordsWithEmoji]);

  useEffect(() => setCurrentPage(1), [debouncedQuery]);

  const totalPages = Math.ceil(filteredWords.length / wordsPerPage);
  const startIndex = (currentPage - 1) * wordsPerPage;
  const currentWords = filteredWords.slice(startIndex, startIndex + wordsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <>
      <div className="absolute top-[60px] left-0 space-x-2">
        <button
          onClick={() => setSrt("asc")}
          className="bg-orange-300 w-[100px] cursor-pointer rounded-md p-2 transition all duration-500 ease hover:bg-green-200"
        >
          Asc
        </button>
        <button
          onClick={() => setSrt("desc")}
          className="bg-orange-300 w-[100px] cursor-pointer rounded-md p-2 transition all duration-500 ease hover:bg-blue-200"
        >
          Desc
        </button>
      </div>

      <div className="flex flex-col items-center py-10 px-4 min-h-screen space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 w-full justify-center">
          {currentWords.map((word, i) => (
            <WordCard
              key={i}
              trendy_word={word.trendy_word}
              alter_word={word.alter_word}
              emoji={word.emoji}
            />
          ))}
        </div>

        {filteredWords.length === 0 && (
          <p className="text-gray-600 text-lg">No matching words found.</p>
        )}

        {filteredWords.length > wordsPerPage && (
  <div className="flex flex-col items-center gap-4 mt-12 mb-8">
    <div className="flex items-center p-1 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 
                   text-slate-600 font-medium
                   hover:bg-cyan-50 hover:text-cyan-700 
                   disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Prev</span>
      </button>

      <div className="h-6 w-[1px] bg-slate-200 mx-2" /> {/* Divider */}

      <div className="px-4 py-2">
        <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
          Page 
          <span className="text-slate-900 mx-1.5">{currentPage}</span> 
          of 
          <span className="text-slate-900 mx-1.5">{totalPages}</span>
        </span>
      </div>

      <div className="h-6 w-[1px] bg-slate-200 mx-2" /> {/* Divider */}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 
                   text-slate-600 font-medium
                   hover:bg-cyan-50 hover:text-cyan-700 
                   disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    
    {/* Visual indicator bar */}
    <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-cyan-400 transition-all duration-300 ease-out"
        style={{ width: `${(currentPage / totalPages) * 100}%` }}
      />
    </div>
  </div>
)}
      </div>
    </>
  );
};

export default UserWords;
