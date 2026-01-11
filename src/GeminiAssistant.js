import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAxi9-cQT-vQi80Y6FmDgx8xh3GJWt0T88");

const GeminiAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt) return;
    setLoading(true);
    setAnswer(""); 
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const smartPrompt = `You are an AI Hackathon Consultant. 
      The current year is 2026. 
      The user is looking for: "${prompt}". 
      List 3 REAL upcoming hackathons for 2026 with:
      - Event Name
      - Date & Month
      - Location (City or Online)
      - Link/Platform (Unstop, Devpost, or HackerEarth)
      
      Maintain a professional tone and use clear bullet points.`;

      const result = await model.generateContent(smartPrompt);
      const response = await result.response;
      setAnswer(response.text());
    } catch (error) {
      setAnswer("Our AI system is currently busy. Please try again in a moment.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 border-2 border-blue-500 rounded-2xl bg-slate-900 mt-8 shadow-2xl">
      <h3 className="text-xl font-bold mb-2 text-blue-400">🌐 Global AI Hackathon Scout</h3>
      <p className="text-sm text-gray-400 mb-6">
        Discover real-time hackathons happening across the globe in 2026.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <input 
          className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
          placeholder="e.g. AI Hackathons in Bangalore June 2026" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button 
          onClick={handleAsk}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold text-white transition-all disabled:opacity-50 shadow-lg"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Live"}
        </button>
      </div>
      
      {answer && (
        <div className="mt-6 p-4 bg-slate-950 rounded-xl text-gray-200 text-sm border-l-4 border-blue-500 whitespace-pre-wrap leading-relaxed">
          <div className="text-blue-400 font-bold mb-2 uppercase tracking-wider text-xs">Live Results Found:</div>
          {answer}
        </div>
      )}
    </div>
  );
};

export default GeminiAssistant;