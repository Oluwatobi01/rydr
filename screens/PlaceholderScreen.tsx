import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PlaceholderScreen: React.FC = () => {
  const navigate = useNavigate();
  const { title } = useParams();

  // Format title from URL param (e.g. "help-center" -> "Help Center")
  const formattedTitle = title
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      <header className="flex items-center p-4 sticky top-0 bg-background-dark z-10">
         <button onClick={() => navigate(-1)} className="p-2"><span className="material-symbols-outlined text-2xl">arrow_back</span></button>
         <h1 className="flex-1 text-center text-lg font-bold mr-10">{formattedTitle || 'Coming Soon'}</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-70">
         <span className="material-symbols-outlined text-6xl mb-4 text-primary">construction</span>
         <h2 className="text-xl font-bold mb-2">Under Construction</h2>
         <p className="text-gray-400">The {formattedTitle} feature is coming soon to Rydr.</p>
      </div>
    </div>
  );
};

export default PlaceholderScreen;