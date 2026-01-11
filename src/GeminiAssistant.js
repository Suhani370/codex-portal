import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Aapki API Key yahan integrated hai
const genAI = new GoogleGenerativeAI("AIzaSyD-YOUR_ACTUAL_KEY_WAS_HERE"); 

const GeminiAssistant = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchHackathons = async () => {
    if (!query) return;
    setLoading(true);
    setResults(null); 
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Professional Unstop-style Prompt
      const prompt = `Act as a Global Hackathon Database Scout (like Unstop/Devpost). 
      Search for real-time "${query}" hackathons worldwide for the year 2026.
      
      For each hackathon, strictly provide:
      1. 🏆 **Hackathon Name & Organizer**
      2. 📅 **Event Dates** (Start Date - End Date, 2026)
      3. 📍 **Location** (Mention City & Country OR "Online/Remote")
      4. 💰 **Prize Pool & Perks** (Specific amount if available)
      5. 📝 **Eligibility & Brief Info** (Who can join?)
      6. ⏳ **Registration Deadline**
      7. 🔗 **Official Link** (Provide the registration URL clearly)

      Format the response using Markdown with bold headings, emojis, and clear spacing so it looks professional on a web page.`;

      const result = await model.generateContent(prompt);
      setResults(result.response.text());
    } catch (error) {
      console.error(error);
      setResults("System is busy fetching global data. Please try again in 10 seconds.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#0f172a] p-8 rounded-3xl border border-blue-500/30 shadow-2xl mt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-3 rounded-2xl">
          <span className="text-2xl">🌐</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Global AI Scout</h2>
          <p className="text-blue-400 text-sm font-medium">Real-time Worldwide Hackathon Discovery</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: 'Blockchain hackathons in USA' or 'Beginner hackathons in India'..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
        />
        <button 
          onClick={searchHackathons}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/40 disabled:opacity-50"
        >
          {loading ? 'Fetching Details...' : 'Find Hackathons'}
        </button>
      </div>

      {results && (
        <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-inner">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <span className="text-green-400 font-bold flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Found Live Results:
            </span>
            <button onClick={() => setResults(null)} className="text-slate-500 hover:text-white text-xs uppercase tracking-widest font-bold">Clear</button>
          </div>
          <div className="prose prose-invert max-w-none whitespace-pre-wrap text-slate-300 text-sm md:text-base leading-relaxed">
            {results}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAssistant;