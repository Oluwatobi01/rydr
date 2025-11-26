import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate('/login'), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-dark overflow-hidden">
      <div className="flex h-full w-full flex-col items-center justify-center p-8">
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          {/* Logo */}
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary animate-bounce">
            <span className="material-symbols-outlined text-background-dark text-7xl">local_taxi</span>
          </div>
          <h1 className="text-white tracking-light text-[32px] font-bold leading-tight text-center">
            Your Ride,<br />Instantly.
          </h1>
        </div>
        {/* Progress Bar */}
        <div className="flex w-full max-w-xs flex-col gap-3">
          <div className="flex justify-center">
            <p className="text-white/80 text-base font-medium leading-normal">Getting things ready...</p>
          </div>
          <div className="rounded-full bg-white/10 overflow-hidden h-2">
            <div 
              className="h-full rounded-full bg-primary transition-all duration-100 ease-linear" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;