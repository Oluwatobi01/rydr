
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (email) {
      setLoading(true);
      if (email.includes('@')) {
        try {
          const { error } = await supabase.auth.signInWithOtp({ email });
          if (error) {
            console.warn('Supabase Login Warning:', error.message);
          } else {
            console.log('Magic link sent to', email);
          }
        } catch (err) {
          console.error('Connection failed:', err);
        }
      }
      setLoading(false);
      navigate('/otp', { state: { email } });
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-dark p-4">
      <div className="flex-grow flex flex-col justify-center px-4 py-8">
        {/* Logo Header */}
        <div className="flex justify-start items-center gap-2 pb-8">
          <span className="material-symbols-outlined text-primary text-4xl">local_taxi</span>
          <p className="text-white text-2xl font-bold">Rydr</p>
        </div>
        
        <h1 className="text-white tracking-light text-[32px] font-bold leading-tight text-left pb-6">
          Get a ride in minutes
        </h1>

        <div className="flex flex-col gap-4">
          <Input 
            label="Email or Phone Number"
            placeholder="Enter your email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Input 
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightElement={
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 flex items-center justify-center px-4 hover:text-white"
                type="button"
              >
                <span className="material-symbols-outlined">{showPassword ? 'visibility' : 'visibility_off'}</span>
              </button>
            }
          />
        </div>

        <div className="flex justify-end pt-2">
          <button className="text-gray-400 text-sm font-normal underline hover:text-white">Forgot Password?</button>
        </div>

        <div className="flex py-6">
          <Button 
            fullWidth 
            onClick={handleContinue} 
            isLoading={loading}
          >
            Continue
          </Button>
        </div>

        <div className="flex items-center gap-4 py-2">
          <hr className="flex-grow border-t border-gray-700"/>
          <span className="text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-t border-gray-700"/>
        </div>

        <div className="flex flex-col gap-4 py-6">
          <Button variant="secondary" fullWidth className="font-medium">
             <span className="font-bold mr-3">G</span> Continue with Google
          </Button>
          <Button variant="secondary" fullWidth icon="phone_iphone" className="font-medium">
             Continue with Apple
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
