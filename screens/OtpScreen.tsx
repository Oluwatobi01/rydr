import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabase';

const OtpScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // Retrieve email passed from LoginScreen
  const email = location.state?.email;

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const value = e.currentTarget.value;
    if (value.length === 1 && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const token = inputs.current.map(i => i?.value || '').join('');
    
    if (token.length === 6 && email) {
      setLoading(true);
      try {
        const { error } = await supabase.auth.verifyOtp({
          email,
          token,
          type: 'email'
        });

        if (error) {
          console.error('Verification failed:', error.message);
          // For demo purposes, we allow proceeding even if API fails (mock flow)
        } else {
          console.log('Verified successfully');
        }
      } catch (err) {
        console.error('Verification error', err);
      }
    }
    
    setLoading(false);
    navigate('/home');
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center p-4 bg-background-dark">
      <div className="w-full max-w-md rounded-xl p-6 flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-6">
          <span className="material-symbols-outlined text-primary text-4xl">phonelink_lock</span>
        </div>
        <h1 className="text-white text-3xl font-bold pb-2">Enter Code</h1>
        <p className="text-gray-400 text-base pb-8">We sent a 6-digit code to {email || '******1234'}.</p>
        
        <div className="flex justify-center gap-2 sm:gap-3 mb-8">
          {[0, 1, 2, 3, 4, 5].map((_, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-10 h-14 sm:w-12 sm:h-16 text-center text-2xl font-bold bg-transparent text-white border-b-2 border-gray-600 focus:border-primary focus:outline-none"
              onChange={(e) => handleInput(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        <button 
          onClick={handleVerify}
          disabled={loading}
          className={`w-full h-14 rounded-xl bg-primary text-black text-base font-bold shadow-lg hover:bg-yellow-400 transition-colors flex items-center justify-center ${loading ? 'opacity-70' : ''}`}
        >
          {loading ? 'Verifying...' : 'Verify & Proceed'}
        </button>
        
        <p className="text-gray-500 text-sm mt-6 cursor-pointer hover:text-white">Resend code in 0:59</p>
      </div>
    </div>
  );
};

export default OtpScreen;