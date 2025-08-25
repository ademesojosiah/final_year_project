import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { AuthLayout } from '../../layouts/AuthLayout';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Get the page user was trying to access
  const from = location.state?.from?.pathname || '/orders';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card>
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
                {/* Error Message - positioned right after password */}
                {error && (
                  <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
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
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-[#2D1B00] text-white py-3.5 px-4 rounded-xl hover:from-[#2D1B00] hover:to-[#1F1200] transition-all duration-200 text-[15px] font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
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
                  onClick={() => navigate('/select-role')}
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </Card>
    </AuthLayout>
  );
};

export default Login;
