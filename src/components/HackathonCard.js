import React, { useState } from 'react';

const HackathonCard = ({ hackathon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500/50 transition-all group relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-600/10 blur-3xl group-hover:bg-blue-600/20 transition-all"></div>

      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${hackathon.type === 'Online' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
          {hackathon.type}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400">{hackathon.title}</h3>
      <p className="text-slate-400 text-sm flex items-center gap-2">📍 {hackathon.city}</p>
      
      <div className="mt-8 pt-5 border-t border-slate-800 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Event Date</span>
          <span className="text-sm text-slate-200 font-semibold">{hackathon.date}</span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white text-black hover:bg-blue-500 hover:text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all"
        >
          View Details
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-slate-950 border border-slate-800 w-full max-w-lg rounded-[2.5rem] p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white text-3xl">&times;</button>
            
            <span className="text-blue-500 font-black text-xs uppercase tracking-tighter">Hackathon Overview</span>
            <h2 className="text-3xl font-black text-white mt-2 mb-6">{hackathon.title}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                  <p className="text-slate-500 text-[10px] uppercase font-bold">Location</p>
                  {/* Field 1: City */}
                  <p className="text-white font-semibold">{hackathon.city}</p>
               </div>
               <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                  <p className="text-slate-500 text-[10px] uppercase font-bold">Deadline</p>
                  {/* Field 2: Deadline */}
                  <p className="text-red-400 font-semibold">{hackathon.deadline}</p>
               </div>
            </div>

            <div className="space-y-6 text-slate-300">
              <div className="relative pl-6 border-l-2 border-blue-600">
                <h4 className="text-white font-bold text-sm">💰 Prize Pool & Rewards</h4>
                {/* Field 3: Prizes */}
                <p className="text-sm mt-1">{hackathon.prizes}</p>
              </div>
              <div className="relative pl-6 border-l-2 border-slate-700">
                <h4 className="text-white font-bold text-sm">📝 About the Event</h4>
                <p className="text-sm mt-1">{hackathon.about || 'Join us for 24 hours of coding and innovation.'}</p>
              </div>
            </div>

            {/* Field 4: Real Link */}
            <a 
              href={hackathon.link} 
              target="_blank" 
              rel="noreferrer"
              className="block w-full text-center mt-10 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg"
            >
              Register Now ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonCard;