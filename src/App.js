import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import GeminiAssistant from './GeminiAssistant'; // Ye file humne pehle banayi thi

function App() {
  const [page, setPage] = useState('home');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setLoggedInUser(userData);
    setPage('home');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setPage('home');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar 
        onLogoClick={() => setPage('home')} 
        onLoginClick={() => setPage('login')}
        user={loggedInUser}
        onLogout={handleLogout}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-10">
        {page === 'home' ? (
          <div>
            <Home />
            {/* Google Gemini Yahan Add Ho Gaya */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
                Can't find a Hackathon? Ask our Google Gemini AI
              </h2>
              <GeminiAssistant />
            </div>
          </div>
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </main>

      <footer className="py-6 text-center text-gray-500 border-t border-gray-800">
        Powered by Google Gemini AI 1.5 Flash
      </footer>
    </div>
  );
}

export default App;