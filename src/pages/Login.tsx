import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#FDFCFA] to-[#F8F4ED] relative overflow-hidden py-8">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#F0E5C9]/30 to-[#E8D5A7]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#F0E5C9]/20 to-[#E8D5A7]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center px-20 relative z-10">
        <div className="max-w-[500px]">
          <h1 className="text-[36px] font-bold text-[#2D1B00] leading-[1.2] tracking-tight">
            Track. Process. Track again
          </h1>
          <p className="mt-6 text-[#6B5B5B] text-lg leading-relaxed font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[540px] flex items-center justify-center px-8 relative z-10">
        <div className="w-full max-w-[420px] bg-white/95 backdrop-blur-sm rounded-3xl p-10 border border-[#F0E5C9]/50 shadow-[0_8px_32px_rgba(62,40,0,0.08)]">
          <div className="text-center mb-8">
            <h2 className="text-[28px] font-semibold text-[#1A1A1A] mb-2">
              Welcome back
            </h2>
            <p className="text-[#6B5B5B] text-sm">
              Please sign in to your account
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#2D1B00] mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 text-[15px] bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#3E2800] focus:bg-white focus:shadow-sm transition-all duration-200 placeholder:text-[#A0A0A0]"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#2D1B00] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 text-[15px] bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl focus:outline-none focus:border-[#3E2800] focus:bg-white focus:shadow-sm transition-all duration-200 placeholder:text-[#A0A0A0]"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-[#6B5B5B] cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#E8E8E8] text-[#3E2800] focus:ring-[#3E2800] focus:ring-offset-0 mr-2" />
                Remember me
              </label>
              <button 
                type="button" 
                className="text-[#8B6F47] text-sm font-medium hover:text-[#6B5537] transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#3E2800] to-[#2D1B00] text-white py-3.5 px-4 rounded-xl hover:from-[#2D1B00] hover:to-[#1F1200] transition-all duration-200 text-[15px] font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
            >
              Sign in
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E8E8E8]"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-6 text-sm text-[#6B5B5B] bg-white font-medium">
                  or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                className="flex items-center justify-center gap-3 px-4 py-3 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200 group cursor-pointer"
              >
                <img src="/icons/google.svg" alt="" className="w-5 h-5" />
                <span className="text-sm font-medium text-[#4A4A4A] group-hover:text-[#2D1B00]">Google</span>
              </button>
              <button 
                type="button" 
                className="flex items-center justify-center gap-3 px-4 py-3 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200 group cursor-pointer"
              >
                <img src="/icons/apple.svg" alt="" className="w-5 h-5" />
                <span className="text-sm font-medium text-[#4A4A4A] group-hover:text-[#2D1B00]">Apple</span>
              </button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-[#6B5B5B]">
                Don't have an account?{' '}
                <button 
                  type="button"
                  className="text-[#8B6F47] font-semibold hover:text-[#6B5537] transition-colors cursor-pointer"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Login;
