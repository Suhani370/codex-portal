import React from 'react';

// Date format karne ka function
const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

// Yahan se 'interface' aur 'React.FC' hata diya hai
const HackathonCard = ({ hackathon }) => {
  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all flex flex-col h-full group p-2">
      <div className="relative h-52 w-full overflow-hidden rounded-xl">
        <img 
          src={hackathon.image} 
          alt={hackathon.title} 
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            hackathon.mode === 'Online' 
            ? 'bg-blue-600 text-white' 
            : 'bg-emerald-600 text-white'
          } shadow-lg`}>
            {hackathon.mode}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-3 leading-tight">
          {hackathon.title}
        </h3>
        
        <div className="space-y-3 mb-8 text-sm">
          <div className="flex items-center text-slate-300">
            <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{formatDate(hackathon.date)}</span>
          </div>
          
          <div className="flex items-center text-slate-400">
            <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{hackathon.city === 'Remote' ? 'Online' : hackathon.city}</span>
          </div>

          <div className="flex items-center text-orange-400 font-medium pt-1">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Last Date to Apply: {formatDate(hackathon.lastDateToApply)}</span>
          </div>
        </div>

        <button className="mt-auto w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-lg active:scale-95">
          View Details
        </button>
      </div>
    </div>
  );
};

export default HackathonCard;