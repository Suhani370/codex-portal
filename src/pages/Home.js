import React, { useState, useMemo } from 'react';
import HackathonCard from '../components/HackathonCard'; 
import { HACKATHONS } from '../data';
import GeminiAssistant from '../GeminiAssistant'; 

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CITIES = ["Delhi", "Mumbai", "Bangalore", "Remote"];

const Home = () => {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');

  const filteredHackathons = useMemo(() => {
    return HACKATHONS.filter(h => {
      const hDate = new Date(h.date);
      const hMonthName = MONTHS[hDate.getMonth()];
      
      const matchesSearch = h.title.toLowerCase().includes(search.toLowerCase());
      const matchesCity = selectedCity === 'All' || h.city === selectedCity;
      const matchesMonth = selectedMonth === 'All' || hMonthName === selectedMonth;

      return matchesSearch && matchesCity && matchesMonth;
    });
  }, [search, selectedCity, selectedMonth]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-10">
      
      {/* 1. Search & Filter Section */}
      <section className="bg-[#0f172a] border border-slate-800 p-8 md:p-10 rounded-3xl shadow-xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Find Your Next Hackathon</h2>
          <p className="text-slate-400 mt-2">Use the options below to filter through our upcoming events.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300 ml-1">Search by name</label>
            <input 
              type="text" 
              placeholder="Type name here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300 ml-1">Select City</label>
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              <option value="All">All Cities</option>
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300 ml-1">Select Month</label>
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              <option value="All">All Months</option>
              {MONTHS.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 2. Main Grid Area */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Upcoming Events</h2>
            <p className="text-slate-400 mt-1">Found {filteredHackathons.length} hackathons matching your search.</p>
          </div>
          
          {(search || selectedCity !== 'All' || selectedMonth !== 'All') && (
            <button 
              onClick={() => {setSearch(''); setSelectedCity('All'); setSelectedMonth('All');}}
              className="text-sm text-blue-400 hover:text-blue-300 font-bold transition-colors border border-blue-400/20 px-4 py-2 rounded-lg"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filteredHackathons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredHackathons.map(h => (
              <HackathonCard key={h.id} hackathon={h} />
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/10">
            <h3 className="text-2xl font-bold text-white mb-3">No Results Found</h3>
            <p className="text-slate-400 mb-6">Try searching with our AI below for more global opportunities!</p>
          </div>
        )}
      </section>

      {/* 3. AI Assistant Section */}
      <section className="pt-10 border-t border-slate-800">
        <GeminiAssistant />
      </section>

    </div>
  );
};

export default Home;