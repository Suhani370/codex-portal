import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      // --- SIGNUP LOGIC ---
      if (!formData.name || !formData.email || !formData.password) {
        alert("Please fill in all fields to create an account.");
        return;
      }
      
      localStorage.setItem('user', JSON.stringify(formData));
      alert("Account created successfully! You can now log in.");
      setIsLogin(true); 
      
    } else {
      // --- LOGIN LOGIC ---
      const savedUser = JSON.parse(localStorage.getItem('user'));
      
      if (savedUser && savedUser.email === formData.email && savedUser.password === formData.password) {
        alert(`Welcome back, ${savedUser.name}! Login successful.`);
        onLoginSuccess(savedUser); 
      } else {
        alert("Invalid Email or Password. Please try again or create an account.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-[#0f172a] p-8 rounded-3xl border border-slate-800 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-400 text-center mb-8">
          {isLogin ? 'Enter your details to sign in' : 'Join the CODEX community today'}
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input 
                name="name" 
                type="text" 
                required
                onChange={handleChange}
                placeholder="Enter your name" 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required
              onChange={handleChange}
              placeholder="name@example.com" 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input 
              name="password" 
              type="password" 
              required
              onChange={handleChange}
              placeholder="••••••••" 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95">
            {isLogin ? 'Sign In' : 'Register Now'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)} 
              className="text-blue-500 hover:text-blue-400 font-bold underline decoration-2 underline-offset-4"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;