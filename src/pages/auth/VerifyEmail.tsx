import { AuthLayout } from '../../layouts/AuthLayout';
import { Card } from '../../components/ui/Card';

const VerifyEmail = () => {
  const handleResendLink = () => {
    // TODO: Implement resend link functionality
    console.log('Resending verification link...');
  };

  return (
    <AuthLayout>
      <Card>
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#F8F4ED]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5 9V15C21.5 18.5 19.5 20 16.5 20H7.5C4.5 20 2.5 18.5 2.5 15V9C2.5 5.5 4.5 4 7.5 4H16.5C19.5 4 21.5 5.5 21.5 9Z" stroke="#3E2800" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.5 8.5L13.37 11C12.34 11.82 11.65 11.82 10.62 11L7.5 8.5" stroke="#5D4601" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">Link sent</h2>
            <p className="mt-2 text-[#6B5B5B]">
              We sent a login link to your email. Click on it to start tracking your orders
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-[#6B5B5B] text-sm">
              Did not get any email?{' '}
              <button
                onClick={handleResendLink}
                className="text-[#3E2800] hover:text-[#2D1B00] font-medium transition-colors"
              >
                Resend Link
              </button>
            </p>
          </div>
        </div>
      </Card>
    </AuthLayout>
  );
};

export default VerifyEmail;
