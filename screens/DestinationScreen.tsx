
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRide } from '../App';

const DestinationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { ride, setDropoff } = useRide();
  const [destination, setDestination] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);

  const isLocating = ride.pickup?.address === 'Fetching location...';

  useEffect(() => {
    // Only search if we have input and the API is loaded
    if (destination.length > 2 && window.google && window.google.maps) {
      const autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions({ input: destination }, (results: any, status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(results);
        } else {
          setPredictions([]);
        }
      });
    } else {
      setPredictions([]);
    }
  }, [destination]);

  const handleConfirm = () => {
    if (destination) {
      setDropoff({ address: destination, name: destination.split(',')[0] });
      navigate('/choose-ride');
    }
  };

  const handlePredictionClick = (prediction: any) => {
    setDestination(prediction.description);
    setDropoff({ address: prediction.description, name: prediction.structured_formatting.main_text });
    navigate('/choose-ride');
  };

  const handleRecentClick = (place: string, address: string) => {
    setDestination(address);
    // Auto confirm for better UX
    setDropoff({ address, name: place });
    navigate('/choose-ride');
  };

  const handleSetOnMap = () => {
    // Simulate picking a point on a map
    const mockAddress = "Pinned Location (Simulated)";
    setDropoff({ address: mockAddress, name: "Pinned Location" });
    navigate('/choose-ride');
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark text-white p-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/home')} className="p-2 rounded-full hover:bg-white/10">
            <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center mr-10">Where are we going?</h2>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex flex-col items-center py-4">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <div className="w-0.5 flex-1 bg-gray-600 my-1"></div>
            <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(244,209,37,0.5)]"></div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
            {/* Pickup Input */}
            <div className="bg-[#2A2A2A] rounded-xl p-4 flex items-center gap-3 border border-white/5">
                <span className="material-symbols-outlined text-gray-400">my_location</span>
                <span className={`text-gray-300 truncate ${isLocating ? 'animate-pulse italic' : ''}`}>
                    {ride.pickup?.address || 'Current Location'}
                </span>
            </div>
            
            {/* Destination Input */}
            <div className="relative">
                <input 
                    autoFocus
                    className="bg-[#2A2A2A] rounded-xl p-4 w-full text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:outline-none border-none"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                {/* Autocomplete Dropdown */}
                {predictions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-[#2A2A2A] rounded-xl mt-2 z-20 shadow-xl overflow-hidden border border-white/5">
                        {predictions.map((p) => (
                            <div 
                                key={p.place_id} 
                                onClick={() => handlePredictionClick(p)}
                                className="p-4 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 flex items-center gap-3"
                            >
                                <span className="material-symbols-outlined text-gray-400">location_on</span>
                                <div>
                                    <p className="text-white font-medium">{p.structured_formatting.main_text}</p>
                                    <p className="text-gray-500 text-xs">{p.structured_formatting.secondary_text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>

      <div onClick={handleSetOnMap} className="flex items-center gap-4 p-3 hover:bg-[#2A2A2A] rounded-xl cursor-pointer mb-2">
         <div className="size-10 rounded-full bg-white/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">map</span>
         </div>
         <span className="font-medium">Set location on map</span>
      </div>
      
      <div className="border-t border-white/10 my-2"></div>

      {predictions.length === 0 && (
          <>
            <div className="flex flex-col gap-2 mt-2">
                <h3 className="text-gray-400 text-sm font-bold mb-2">Saved Places</h3>
                <div className="flex items-center gap-4 p-3 hover:bg-[#2A2A2A] rounded-xl cursor-pointer" onClick={() => handleRecentClick('Home', '3517 W. Gray St. Utica, Pennsylvania')}>
                    <div className="size-10 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="material-symbols-outlined">home</span>
                    </div>
                    <div>
                        <p className="font-medium">Home</p>
                        <p className="text-sm text-gray-400">3517 W. Gray St. Utica, PA</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-3 hover:bg-[#2A2A2A] rounded-xl cursor-pointer" onClick={() => handleRecentClick('Work', '2118 Thornridge Cir. Syracuse')}>
                    <div className="size-10 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="material-symbols-outlined">work</span>
                    </div>
                    <div>
                        <p className="font-medium">Work</p>
                        <p className="text-sm text-gray-400">2118 Thornridge Cir. Syracuse</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
                <h3 className="text-gray-400 text-sm font-bold mb-2">Recent Locations</h3>
                <div className="flex items-center gap-4 p-3 hover:bg-[#2A2A2A] rounded-xl cursor-pointer" onClick={() => handleRecentClick('Grand Central Station', '42nd St, New York, NY 10017')}>
                    <div className="size-10 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="material-symbols-outlined">history</span>
                    </div>
                    <div>
                        <p className="font-medium">Grand Central Station</p>
                        <p className="text-sm text-gray-400">42nd St, New York, NY</p>
                    </div>
                </div>
            </div>
          </>
      )}

      <div className="mt-auto pt-4">
        <button 
            onClick={handleConfirm}
            disabled={!destination}
            className={`w-full h-14 rounded-xl font-bold text-lg text-background-dark transition-colors ${destination ? 'bg-primary hover:bg-yellow-400' : 'bg-gray-600 cursor-not-allowed'}`}
        >
            Confirm Destination
        </button>
      </div>
    </div>
  );
};

export default DestinationScreen;
