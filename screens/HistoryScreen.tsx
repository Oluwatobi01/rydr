import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryScreen: React.FC = () => {
  const navigate = useNavigate();

  const historyItems = [
    { id: 1, date: 'Today, 10:23 AM', location: '42nd St, New York', price: 12.50, status: 'Completed' },
    { id: 2, date: 'Yesterday, 6:45 PM', location: 'Home', price: 15.20, status: 'Completed' },
    { id: 3, date: 'Oct 24, 8:30 AM', location: 'Work', price: 11.00, status: 'Canceled' },
    { id: 4, date: 'Oct 22, 9:15 PM', location: 'JFK Airport', price: 45.00, status: 'Completed' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      <header className="flex items-center p-4 sticky top-0 bg-background-dark z-10">
         <button onClick={() => navigate('/home')} className="p-2"><span className="material-symbols-outlined text-2xl">arrow_back</span></button>
         <h1 className="flex-1 text-center text-lg font-bold mr-10">Ride History</h1>
      </header>

      <div className="flex-1 p-4 flex flex-col gap-4">
        {historyItems.map((item) => (
          <div key={item.id} className="bg-[#1E1E1E] rounded-xl p-4 flex justify-between items-center border border-white/5">
            <div className="flex gap-4 items-center">
              <div className="size-12 rounded-full bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-300">local_taxi</span>
              </div>
              <div>
                <p className="font-bold text-white">{item.location}</p>
                <p className="text-sm text-gray-400">{item.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-white">${item.price.toFixed(2)}</p>
              <p className={`text-xs font-bold ${item.status === 'Canceled' ? 'text-red-500' : 'text-green-500'}`}>{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryScreen;