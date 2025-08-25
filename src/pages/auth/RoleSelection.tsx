import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { AuthLayout } from '../../layouts/AuthLayout';
import { useAuth } from '../../context/AuthContext';

type Role = 'user' | 'manager';

const RoleSelection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as Role | ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      await signup(formData.name, formData.email, formData.password, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">
              Create New Account
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E8E8] focus:border-[#3E2800] focus:ring-1 focus:ring-[#3E2800] transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E8E8] focus:border-[#3E2800] focus:ring-1 focus:ring-[#3E2800] transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E8E8] focus:border-[#3E2800] focus:ring-1 focus:ring-[#3E2800] transition-colors"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E8E8] focus:border-[#3E2800] focus:ring-1 focus:ring-[#3E2800] transition-colors"
                >
                  <option value="">Select a role</option>
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              {error && (
                <div className="text-red-600 text-sm mt-2">
                  {error}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.name || !formData.email || !formData.password || !formData.role}
            className="w-full bg-[#3E2800] text-white py-2.5 px-4 rounded-lg hover:bg-[#2D1B00] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
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
