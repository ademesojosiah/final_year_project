import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Role = 'user' | 'manager' | 'worker';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<Role | ''>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      console.log('Selected role:', selectedRole);
      navigate('/dashboard');
    }
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">
                Login
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E8E8] focus:border-[#3E2800] focus:ring-1 focus:ring-[#3E2800] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E8E8] focus:border-[#3E2800] focus:ring-1 focus:ring-[#3E2800] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                    Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as Role)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-[#E8E8E8] focus:border-[#3E2800] focus:ring-1 focus:ring-[#3E2800] transition-colors"
                  >
                    <option value="">Select a role</option>
                    <option value="student">User</option>
                    <option value="teacher">Worker</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedRole}
              className="w-full bg-[#3E2800] text-white py-2.5 px-4 rounded-lg hover:bg-[#2D1B00] transition-colors font-medium"
            >
              Submit
            </button>

            <p className="text-center text-sm text-[#6B5B5B]">
              Don't have an account yet? <a href="/login" className="text-[#3E2800] hover:text-[#2D1B00] font-medium">Create an account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
