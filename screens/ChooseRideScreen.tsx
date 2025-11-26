import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRide } from '../App';
import { RideOption } from '../types';

const rides: RideOption[] = [
  { id: '1', name: 'John D.', price: 12.50, timeAway: 3, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaNAo2ukiIjKAVh039xCqAtIgGucMjV5v_FyXeItxaXLy6D1t1UEhoku7mJBqQlgtC0krQ8bSaJHmy_MsQ4ZdACBet7t1tbTiUE9AAq1-7kw3I62YKNqNpqfms6hHMxC6rTK5sVf6OLTkURZucXy2PCmR5TDYANnz02WMeDT-TXrQAmHwvu96hQk3mieYmASkgNatTMT6fUfzk6Hzx_ejs1pokIH3lJjvkz4mxmX8Qa8rrkELTSE6ViaRE1LAS4Xxl_FJu99sQKpk', car: 'Tesla Model 3', plate: 'ABC-123', rating: 4.9 },
  { id: '2', name: 'Maria S.', price: 11.00, timeAway: 5, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ9He8_ViyfVTQwB7T-Fm_0mha8zNEGsULS5nsbWlAe7NOHt7mj4vdLLe7thoEzh_HmI74xh2PbU6L0YWzy8QMNbuRPQyGhcznXkdVCq7Hen66B_AsaYdz4A4BgFjTEf1D_sjNiaFQd-aHN0WEffg3G9txjPBOM9cEcFMMfCn86FFGuqR5N7o0_tJVcZf1-fkMV_iH5tmjmenoOaSIKprkUKfNgHT2NIF9b7QAdAn67xX-n8zJbXO8KjnhFbVk7KaNht7tvFQweao', car: 'Toyota Prius', plate: 'XYZ-456', rating: 4.8 },
  { id: '3', name: 'Alex R.', price: 14.75, timeAway: 6, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB86RKJx9xeSANkJzGF_jHtWbVvaEbCm3FIZ6bDa2d4b76UM2r5bl46Kkg92eenvSdOOyTLRKqKaV_1Mr9ZdKM7bAJIjqCmNyA_anVKNaTKxzD7QiMEfuYNu9T58bcIxkTGtjieG7wuEBWt1tSdpD9NdszsH4f6wKCwddLraZbG-dF_hhWRQtWjzWqDhEq3KKbfIenzmIGoJEElHIfWlpFSMvnUPDokgYvL8qlPIVv_RGNvmmpIDxfadtmRIAH_YKYjvWWB00atpys', car: 'Honda CR-V', plate: 'LMN-789', rating: 4.9 },
];

type SortType = 'fastest' | 'cheapest' | 'rating';

const ChooseRideScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectRide, ride } = useRide();
  const [selectedId, setSelectedId] = useState<string>(rides[0].id);
  const [sortBy, setSortBy] = useState<SortType>('fastest');

  // Sort rides based on selected chip
  const sortedRides = useMemo(() => {
    const sorted = [...rides];
    switch (sortBy) {
      case 'fastest':
        return sorted.sort((a, b) => a.timeAway - b.timeAway);
      case 'cheapest':
        return sorted.sort((a, b) => a.price - b.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [sortBy]);

  // Update selected ID when sort changes if the current selection moves
  React.useEffect(() => {
    if (sortedRides.length > 0) {
        // Keep current selection if possible, else select first
        if (!sortedRides.find(r => r.id === selectedId)) {
            setSelectedId(sortedRides[0].id);
        }
    }
  }, [sortedRides]);

  const handleSelect = (r: RideOption) => {
    setSelectedId(r.id);
  };

  const handleConfirm = () => {
    const r = rides.find(x => x.id === selectedId);
    if (r) {
      selectRide(r);
      navigate('/review');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark text-white relative">
      <header className="flex items-center p-4 sticky top-0 bg-background-dark/95 backdrop-blur z-10">
        <button onClick={() => navigate('/destination')} className="p-2 rounded-full hover:bg-white/10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg mr-10">Choose Your Ride</h1>
      </header>

      <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar">
         <button 
            onClick={() => setSortBy('fastest')}
            className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${sortBy === 'fastest' ? 'bg-primary text-black' : 'bg-[#2A2A2A] text-white'}`}
         >
            Fastest
         </button>
         <button 
            onClick={() => setSortBy('cheapest')}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${sortBy === 'cheapest' ? 'bg-primary text-black' : 'bg-[#2A2A2A] text-white'}`}
         >
            Cheapest
         </button>
         <button 
            onClick={() => setSortBy('rating')}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${sortBy === 'rating' ? 'bg-primary text-black' : 'bg-[#2A2A2A] text-white'}`}
         >
            Highest Rated
         </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 pb-32">
        {sortedRides.map(r => (
            <div 
              key={r.id}
              onClick={() => handleSelect(r)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedId === r.id ? 'border-primary bg-primary/10' : 'border-transparent bg-[#1E1E1E]'}`}
            >
              <div className="flex justify-between items-start">
                 <div className="flex gap-4">
                    <img src={r.image} alt={r.name} className="w-14 h-14 rounded-full object-cover" />
                    <div>
                        <h3 className="font-bold">{r.name}</h3>
                        <p className="text-gray-400 text-sm">{r.car} • {r.plate}</p>
                        <div className="flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-primary text-sm filled">star</span>
                            <span className="text-sm font-medium">{r.rating}</span>
                        </div>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-lg font-bold">${r.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-400">{r.timeAway} min away</p>
                 </div>
              </div>
            </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-background-dark border-t border-white/5">
         <button 
           onClick={handleConfirm}
           className="w-full h-14 rounded-xl bg-primary text-black font-bold text-lg shadow-lg shadow-primary/20"
         >
            Confirm Ride with {rides.find(r => r.id === selectedId)?.name.split(' ')[0]}
         </button>
      </div>
    </div>
  );
};

export default ChooseRideScreen;