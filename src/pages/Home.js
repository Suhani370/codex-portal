import React, { useState, useMemo } from 'react';
import HackathonCard from '../components/HackathonCard'; 
import { HACKATHONS } from '../data';
import GeminiAssistant from '../GeminiAssistant'; 

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const CITIES = ["Delhi", "Mumbai", "Bangalore", "Remote"];

const Home = () => {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');

  const filteredHackathons = useMemo(() => {
    return HACKATHONS.filter(h => {
      // Data sync check
      const hDate = new Date(h.date);
      const hMonthName = MONTHS[hDate.getMonth()];
      
      const matchesSearch = h.title.toLowerCase().includes(search.toLowerCase());
      const matchesCity = selectedCity === 'All' || h.city === selectedCity;
      const matchesMonth = selectedMonth === 'All' || hMonthName === selectedMonth;

      return matchesSearch && matchesCity && matchesMonth;
    });
  }, [search, selectedCity, selectedMonth]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-10 animate-in fade-in duration-700">
      
      {/* 1. Dynamic Hero & Filter Section */}
      <section className="bg-[#0f172a]/80 border border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -z-10"></div>
        
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl font-black text-white tracking-tight md:text-5xl">
            Find Your Next <span className="text-blue-500">Big Win</span>.
          </h2>
          <p className="text-slate-400 mt-4 text-lg">Browse verified events or use our AI to scout global opportunities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)} 
            className="bg-slate-950 border border-slate-700 rounded-2xl px-6 py-4 text-white cursor-pointer hover:border-blue-500 transition-colors"
          >
            <option value="All">All Regions</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)} 
            className="bg-slate-950 border border-slate-700 rounded-2xl px-6 py-4 text-white cursor-pointer hover:border-blue-500 transition-colors"
          >
            <option value="All">Any Time</option>
            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </section>

      {/* 2. Hackathons Results Grid */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            Upcoming Events 
            <span className="bg-blue-600/20 text-blue-400 text-xs py-1 px-3 rounded-full">{filteredHackathons.length}</span>
          </h3>
          { (search || selectedCity !== 'All' || selectedMonth !== 'All') && (
            <button onClick={() => {setSearch(''); setSelectedCity('All'); setSelectedMonth('All');}} className="text-sm text-slate-500 hover:text-white underline">Clear All</button>
          )}
        </div>

        {filteredHackathons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHackathons.map(h => (
              <HackathonCard key={h.id} hackathon={h} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/20 rounded-[2rem] border border-dashed border-slate-800">
            <p className="text-slate-500 text-lg mb-4">No local hackathons found for your filters.</p>
            <p className="text-blue-400 font-bold italic">Try searching with our Global AI Scout below! 👇</p>
          </div>
        )}
      </section>

      {/* 3. AI Global Scout (The Dynamic Core) */}
      <section className="pt-16 border-t border-slate-800/50">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">🌐 Global AI Hackathon Scout</h3>
          <p className="text-slate-400">Can't find what you need? Ask Gemini to find 2026 hackathons anywhere in the world.</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 p-px rounded-[2.5rem]">
           <GeminiAssistant />
        </div>
      </section>

    </div>
  );
};

export default Home;