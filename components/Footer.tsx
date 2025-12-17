"use client"
import { Github, Twitter, Mail, Globe } from "lucide-react"; 
import Link from 'next/link';
import { useAuth } from '@/context/AuthProvider';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ctx=useAuth()
  return (
    <footer className="w-full bg-[#0f172a] text-slate-300 pt-16 pb-8 px-6 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="text-xl font-bold text-white tracking-tight">TrendyWords</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Decoding modern slang and trendy vocabulary so you're never left out of the conversation.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Explore</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/words" className="hover:text-cyan-400 transition-colors">Trending Now</Link></li>
            {ctx.token && 
            <li><Link href="/share" className="hover:text-cyan-400 transition-colors">Submit Word</Link></li>
            }
            <li><Link href="/words" className="hover:text-cyan-400 transition-colors">Categories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Support</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Use</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Stay Connected</h4>
          <div className="flex gap-4 mb-6">
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all">
              <Github size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 hover:text-white transition-all">
              <Mail size={18} />
            </a>
          </div>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button className="absolute right-1 top-1 bottom-1 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md text-xs font-medium transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500 uppercase tracking-widest">
          © {currentYear} TrendyWords. All rights reserved.
        </p>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Globe size={14} />
          <span>English (US)</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;