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
    <div className="min-h-screen flex bg-white relative overflow-hidden">
      
      <div className="flex-1 flex flex-col justify-center px-20">
        <h1 className="text-[32px] font-semibold text-[#3E2800] leading-tight">
          Track. Process. Track again
        </h1>
        <p className="mt-4 text-[#666666] text-base max-w-[460px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        </p>
      </div>

      <div className="w-[520px] flex items-center justify-center px-4">
        <div className="w-full max-w-[420px] bg-white rounded-2xl p-8 border border-[#F0E5C9]">
          <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">
            Login
          </h2>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-[#1A1A1A] mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-[15px] border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#3E2800] transition-colors"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm text-[#1A1A1A] mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-[15px] border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#3E2800] transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-end">
              <button 
                type="button" 
                className="text-[#8B6F47] text-sm hover:underline"
              >
                Forgot password
              </button>
            </div>

            <div className="grid gap-3">
              <button 
                type="button" 
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E5E5] rounded-lg hover:bg-[#F8F8F8] transition-colors"
              >
                <img src="/icons/google.svg" alt="" className="w-5 h-5" />
                Sign in with Google
              </button>
              <button 
                type="button" 
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E5E5] rounded-lg hover:bg-[#F8F8F8] transition-colors"
              >
                <img src="/icons/apple.svg" alt="" className="w-5 h-5" />
                Sign in with Apple
              </button>
            </div>

            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E5E5]"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-[#666666] bg-white">
                  or with
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3E2800] text-white py-2.5 px-4 rounded-lg hover:bg-[#2E1E00] transition-colors text-sm font-medium"
            >
              Login
            </button>

            <div className="text-center text-sm text-[#666666] pt-2">
              Don't have an account yet?{' '}
              <button 
                type="button"
                className="text-[#8B6F47] hover:underline font-medium"
                onClick={() => navigate('/signup')}
              >
                Create an account
              </button>
            </div>
          </form>
        </div>
      </div>

   
      <div className="absolute -top-[30%] -left-[10%] w-[800px] h-[800px] rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute -bottom-[40%] -right-[20%] w-[1000px] h-[1000px] rounded-full opacity-50 blur-3xl"></div>
    </div>
  );
};


export default Login;
