import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Suhani, maine aapki key yahan add kar di hai
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
      
      const prompt = `Act as a Global Hackathon Scout (like Unstop). 
      Search for real upcoming "${query}" hackathons worldwide in 2026.
      For each event, provide:
      🏆 **Name & Organizer**
      📅 **Date (2026)**
      📍 **Location (City/Online)**
      💰 **Prize Pool**
      ⏳ **Deadline**
      🔗 **Registration Link**
      
      Format with bold headings and emojis for a professional UI.`;

      const result = await model.generateContent(prompt);
      setResults(result.response.text());
    } catch (error) {
      console.error(error);
      setResults("System busy or API error. Please try again in a moment.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#0f172a] p-8 rounded-3xl border border-blue-500/20 mt-10 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl animate-bounce">🌐</span>
        <div>
          <h3 className="text-2xl font-bold text-white">Global AI Scout</h3>
          <p className="text-blue-400 text-sm">Real-time 2026 Hackathon Tracker</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: 'AI hackathons in India' or 'Web3 global events'..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={searchHackathons}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg"
        >
          {loading ? 'Searching...' : 'Search Live'}
        </button>
      </div>

      {results && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-in fade-in duration-500">
          <div className="text-slate-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {results}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAssistant;