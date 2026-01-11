import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAxi9-cQT-vQi80Y6FmDgx8xh3GJWt0T88"); 

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
      
      // Strict Prompt for Real Data
      const prompt = `You are a professional Hackathon Scout. Search for ACTUAL upcoming "${query}" hackathons in 2026.
      For each event, you MUST provide:
      1. 🏆 **Name of Event**
      2. 📅 **Exact Dates (2026)**
      3. 📍 **Venue/Online**
      4. 💰 **Specific Prize Pool**
      5. 🔗 **Direct Registration Link (URL)**
      
      Important: Do not make up fake links. Use real data from sites like Unstop, Devfolio, or Devpost. 
      Format each result clearly with emojis.`;

      const result = await model.generateContent(prompt);
      setResults(result.response.text());
    } catch (error) {
      console.error(error);
      setResults("Connection error. Please check your internet or API key.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#0f172a] p-8 rounded-3xl border border-blue-500/20 mt-10 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-lg animate-pulse">🌐</div>
        <div>
          <h3 className="text-2xl font-bold text-white">Global AI Scout</h3>
          <p className="text-blue-400 text-sm">Real-time Global Search Engine</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search global events (e.g. 'NASA hackathon' or 'AI India')..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button 
          onClick={searchHackathons}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Fetching Real-time...' : 'Scout World'}
        </button>
      </div>

      {results && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-in slide-in-from-bottom-5 duration-500">
          <div className="text-slate-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {results}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAssistant;