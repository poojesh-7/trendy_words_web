"use client";

import { FormEvent, useRef, useState } from "react";
import { registerUser } from "@/apis/user";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { AddTrendyWord } from "@/apis/words";

const corner = {
  topl: "absolute bg-blue-400 w-[8px] h-[8px] top-0 left-0",
  topr: "absolute bg-yellow-400 w-[8px] h-[8px] top-0 right-0",
  botl: "absolute bg-yellow-400 w-[8px] h-[8px] bottom-0 left-0",
  botr: "absolute bg-blue-400 w-[8px] h-[8px] bottom-0 right-0",
};

const WordForm = () => {
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const router=useRouter()
  const meaningRef = useRef<HTMLInputElement>(null);
  const wordRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const word =wordRef.current?.value.trim() || "";
    const meaning = meaningRef.current?.value.trim() || "";

    try {
      const resp = await AddTrendyWord(word,meaning,token);
      let finalMessage: string | string[];

      if (resp?.errors) {
        finalMessage = resp.errors.map((item: any) => item.msg);
      } else if (resp?.error) {
        finalMessage = resp.error;
      } else {
        finalMessage = "Word added in successfully!";
        
        if (typeof window !== "undefined") {
          router.push("/profile");
        }
      }

      setMessage(finalMessage);
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-[300px] h-[360px] flex flex-col justify-between items-center bg-white shadow-md rounded-lg p-4"
    >
      {message && (
        <div
          className={`text-center text-sm mb-2 ${
            typeof message === "string" && message.startsWith("✅")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {Array.isArray(message) ? message.join(" • ") : message}
        </div>
      )}

      <h1 className="text-lg font-semibold">
        Add Trendy Words
      </h1>

      <div className="relative border-b-2 w-[252px]">
        <div className={corner.topl}></div>
        <div className={corner.topr}></div>
        <div className={corner.botl}></div>
        <div className={corner.botr}></div>
        <input
          ref={wordRef}
          type="text"
          placeholder="Enter trendy word"
          className="w-full h-[42px] outline-none bg-blue-50 px-2"
          disabled={loading}
          />
      </div>
      <div className="relative border-b-2 w-[252px]">
        <div className={corner.topl}></div>
        <div className={corner.topr}></div>
        <div className={corner.botl}></div>
        <div className={corner.botr}></div>
        <input
          ref={meaningRef}
          type="text"
          placeholder="Enter meaning"
          className="w-full h-[42px] outline-none bg-blue-50 px-2"
          disabled={loading}
        />
      </div>


      <button
        type="submit"
        disabled={loading}
        className={`text-gray-900 self-end bg-gradient-to-r from-teal-200 to-lime-200
          transition ease-in-out duration-500 hover:scale-105 hover:bg-gradient-to-l 
          focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700
          shadow-md hover:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer
          ${loading ? "opacity-60 cursor-not-allowed hover:scale-100" : ""}`}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default WordForm;
