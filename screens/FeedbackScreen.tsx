import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRide } from '../App';

const FeedbackScreen: React.FC = () => {
  const navigate = useNavigate();
  const { ride, resetRide } = useRide();
  const [rating, setRating] = useState(0);
  const [tip, setTip] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // Logic to submit feedback would go here
    console.log({ rating, tip, comment });
    resetRide();
    navigate('/home');
  };

  if (!ride.selectedRide) return null;

  return (
    <div className="flex flex-col h-screen bg-background-dark p-4 text-white">
      <div className="flex items-center justify-between mb-4">
         <div></div>
         <h2 className="font-bold">Arrived at your destination!</h2>
         <button onClick={handleSubmit} className="p-2 hover:bg-white/10 rounded-full"><span className="material-symbols-outlined">close</span></button>
      </div>

      <div className="flex items-center justify-between bg-[#1E1E1E] p-4 rounded-xl mb-6 border border-white/5">
         <div className="flex items-center gap-3">
            <img src={ride.selectedRide.image} className="w-12 h-12 rounded-full object-cover" alt="Driver"/>
            <div>
                <p className="font-bold">{ride.selectedRide.name}</p>
                <p className="text-sm text-gray-400">{ride.selectedRide.car}</p>
            </div>
         </div>
         <span className="font-bold text-lg">${ride.selectedRide.price.toFixed(2)}</span>
      </div>

      <div className="text-center mb-6">
         <h1 className="text-3xl font-bold mb-4">How was your ride?</h1>
         <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(i => (
                <button 
                    key={i} 
                    onClick={() => setRating(i)}
                    className="focus:outline-none transform active:scale-90 transition-transform"
                >
                    <span className={`material-symbols-outlined text-5xl ${i <= rating ? 'text-primary filled' : 'text-gray-600'}`}>star</span>
                </button>
            ))}
         </div>
      </div>

      <h3 className="font-bold mb-3">Add a tip</h3>
      <div className="grid grid-cols-4 gap-3 mb-6">
         {['15%', '20%', '25%', 'Custom'].map((opt) => (
             <button 
                key={opt}
                onClick={() => setTip(opt)}
                className={`h-12 rounded-lg font-bold transition-colors ${tip === opt ? 'bg-primary text-black' : 'bg-[#2A2A2A] text-white hover:bg-[#333]'}`}
             >
                 {opt}
             </button>
         ))}
      </div>

      <textarea 
        className="w-full h-32 bg-[#2A2A2A] rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        placeholder="Leave a comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <div className="mt-auto pt-4 pb-4">
         <button 
            onClick={handleSubmit}
            className="w-full h-14 rounded-xl bg-primary text-black font-bold text-lg hover:bg-yellow-400 transition-colors"
         >
            Submit Feedback
         </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;