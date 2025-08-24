import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { AuthLayout } from '../../layouts/AuthLayout';

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
    <AuthLayout>

      <Card>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">
              Select Your Role
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
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
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
            Already have an account? <a href="/login" className="text-[#3E2800] hover:text-[#2D1B00] font-medium">Login here</a>
          </p>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default RoleSelection;
