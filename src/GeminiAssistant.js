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
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Professional Prompt for Detailed Results
      const prompt = `You are an expert Hackathon Scout. A user is looking for: "${query}".
      Search and provide a detailed list of REAL upcoming and ongoing hackathons for 2026. 
      For each hackathon found, you MUST provide:
      - 🏆 Name of the Hackathon
      - 📅 Date, Month, and Year (2026)
      - 📍 Mode (Online or City Name)
      - 💰 Prize Pool & Rewards (be specific)
      - ⏳ Application Deadline
      - 🔗 Official Registration Link
      
      Format the output using clear bullet points and bold headings for easy reading. 
      If no specific match is found, suggest the top 3 global hackathons happening this month.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResults(text);
    } catch (error) {
      console.error(error);
      setResults("Our AI scout is temporarily busy. Please try searching again in a moment.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-800/40 p-6 rounded-2xl border border-blue-500/20 shadow-xl mt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-lg animate-pulse">
          <span className="text-xl">🌐</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Global AI Scout</h3>
          <p className="text-xs text-blue-300">Powered by Gemini 1.5 Flash • Real-time 2026 Updates</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Machine Learning hackathons in Feb 2026 with prizes..."
          className="flex-1 bg-gray-900/80 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button 
          onClick={searchHackathons}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-8 py-3 rounded-xl font-bold text-white shadow-lg shadow-blue-900/20 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : 'Search Live'}
        </button>
      </div>

      {results && (
        <div className="bg-gray-900/90 p-5 rounded-xl border border-gray-700 max-h-[500px] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
            <span className="text-blue-400 font-semibold flex items-center gap-2">
              ✨ Live Intelligence Found:
            </span>
            <button onClick={() => setResults(null)} className="text-gray-500 hover:text-white text-sm">Clear</button>
          </div>
          <div className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
            {results}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAssistant;