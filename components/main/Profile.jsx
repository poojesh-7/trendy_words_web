"use client";
import { UserProfile } from "@/apis/user";
import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import WordCard from "./WordCard";
import { User, Hash, Sparkles, Calendar, Settings, LogOut } from "lucide-react";
import Link from "next/link";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userWords, setUserWords] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  useEffect(() => {
    if (!token) {
      return;
    }

    setLoading(true);
    UserProfile(token)
      .then((data) => {
        setUser(data[0]);
        setUserWords(data[1]);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Failed to fetch profile:", err);
      })
      .finally(() => setLoading(false));
  }, [token]);
  if (loading) {
    return <Loader />;
  }
  return (
    <main className="min-h-screen mt-[-50px] pt-24 lg:pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        <aside className="w-full lg:w-80 lg:sticky lg:top-32 space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm text-center lg:text-left">
            <div className="relative inline-block lg:block mb-6">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-cyan-200 mx-auto lg:mx-0">
                <User size={48} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center text-xs shadow-sm">
                ⚡
              </div>
            </div>

            <h1 className="text-2xl font-black text-slate-900 mb-1">
              {user?.name}
            </h1>
            <p className="text-slate-400 text-sm font-medium mb-6">
              {user?.email}
            </p>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 text-slate-500 text-sm font-semibold px-2">
                <Calendar size={16} className="text-cyan-500" />
                <span>Joined {user?.joined}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm font-semibold px-2">
                <Hash size={16} className="text-cyan-500" />
                <span>{userWords.length} Words Shared</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both w-full">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                My Dictionary
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Managing your personal collection of trends
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 px-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2">
                <Sparkles size={16} className="text-cyan-500" />
                <span className="text-xs font-black text-slate-600 uppercase tracking-widest">
                  Active Member
                </span>
              </div>
            </div>
          </div>

          {userWords.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center">
              <div className="text-5xl mb-4 grayscale opacity-30">✍️</div>
              <h3 className="text-xl font-bold text-slate-800">
                Your dictionary is empty
              </h3>
              <p className="text-slate-500 mt-2 mb-6">
                Found some new slang? Be the first to define it.
              </p>
              <Link href="/share">
                <button className="bg-cyan-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-900 transition-colors">
                  Create a Word
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {userWords.map((word, i) => (
                <div
                  key={i}
                  className="animate-in fade-in zoom-in-95 duration-500 fill-mode-both"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <WordCard
                    trendy_word={word.trendy_word}
                    alter_word={word.alter_word}
                    emoji={word.emoji}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;
