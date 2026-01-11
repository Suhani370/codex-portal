import React from 'react';

const Navbar = ({ onLogoClick, onLoginClick, user, onLogout }) => {
  return (
    <nav className="bg-[#0f172a] border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          onClick={onLogoClick} 
          className="text-2xl font-black text-white cursor-pointer tracking-tighter"
        >
          CODEX<span className="text-blue-500">.</span>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-slate-300 font-medium">Hi, <span className="text-blue-400">{user.name}</span></span>
              <button 
                onClick={onLogout}
                className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg active:scale-95"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;