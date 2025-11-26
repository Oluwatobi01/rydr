
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRide } from '../App';
import Map from '../components/Map';

const ReviewRideScreen: React.FC = () => {
  const navigate = useNavigate();
  const { ride, setStatus, resetRide } = useRide();
  const [fare, setFare] = useState(ride.selectedRide?.price || 0);
  const [fareMessage, setFareMessage] = useState<string | null>(null);

  useEffect(() => {
    if (ride.selectedRide) {
        setFare(ride.selectedRide.price);
    }
  }, [ride.selectedRide]);

  // Simulate real-time dynamic pricing update
  useEffect(() => {
      const timer = setTimeout(() => {
          // 40% chance of price surge simulation
          if (Math.random() > 0.6) {
              const newFare = fare * 1.12; // 12% increase
              setFare(newFare);
              setFareMessage("Fare updated due to high demand.");
              
              // Hide message after 4 seconds
              setTimeout(() => setFareMessage(null), 4000);
          }
      }, 2500);
      return () => clearTimeout(timer);
  }, []); // Run once on mount

  const handleConfirm = () => {
    setStatus('booking');
    // Simulate booking delay
    setTimeout(() => {
        setStatus('arriving');
        navigate('/progress');
    }, 1500);
  };

  const handleCancel = () => {
    resetRide();
    navigate('/home');
  };

  if (!ride.selectedRide) return null;

  return (
    <div className="h-screen w-full relative bg-background-dark text-white">
       {/* Map with Route */}
       <div className="absolute inset-0">
         <Map 
            origin={ride.pickup?.address || "New York, NY"}
            destination={ride.dropoff?.address || "Newark, NJ"}
            showDirections={true}
            markers={[
                { lat: 40.7128, lng: -74.0060, title: 'Pickup' },
            ]}
         />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-background-dark rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
         {/* Handle */}
         <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 bg-gray-700 rounded-full"></div>
         </div>
         
         {/* Fare Update Notification */}
         {fareMessage && (
             <div className="bg-primary/20 text-primary text-center py-2 px-4 text-sm font-bold border-y border-primary/20 animate-fade-in">
                 {fareMessage}
             </div>
         )}
         
         <div className="flex items-center justify-between px-6 py-2">
            <h2 className="text-xl font-bold">Review Your Ride</h2>
            <button onClick={handleCancel} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
                <span className="material-symbols-outlined text-xl">close</span>
            </button>
         </div>

         <div className="p-4 flex flex-col gap-4 overflow-y-auto">
            {/* Route */}
            <div className="bg-[#1E1E1E] rounded-xl p-4">
                <div className="flex gap-4 mb-4">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                            <span className="material-symbols-outlined text-sm">my_location</span>
                        </div>
                        <div className="w-0.5 h-full bg-gray-700 my-1 border-l-2 border-dashed border-gray-600"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between py-1">
                        <div>
                            <p className="text-gray-400 text-xs uppercase font-bold">Pickup</p>
                            <p className="font-medium text-sm line-clamp-1">{ride.pickup?.address}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-400 text-xs uppercase font-bold">Dropoff</p>
                            <p className="font-medium text-sm line-clamp-1">{ride.dropoff?.address}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Driver */}
            <div className="bg-[#1E1E1E] rounded-xl p-4 flex items-center gap-4">
                <img src={ride.selectedRide.image} alt="Driver" className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold">{ride.selectedRide.name}</h3>
                        <div className="flex items-center bg-yellow-500/20 px-1.5 rounded">
                            <span className="material-symbols-outlined text-primary text-xs filled">star</span>
                            <span className="text-xs font-bold ml-1 text-primary">{ride.selectedRide.rating}</span>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm">{ride.selectedRide.car}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-300">chat_bubble</span>
                </div>
            </div>

            {/* Price & Payment */}
            <div className="bg-[#1E1E1E] rounded-xl overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b border-gray-800">
                    <span className="text-gray-300">Estimated Fare</span>
                    <span className={`text-xl font-bold ${fareMessage ? 'text-yellow-400 animate-pulse' : 'text-primary'}`}>
                        ${fare.toFixed(2)}
                    </span>
                </div>
                <div 
                    onClick={() => navigate('/payment')}
                    className="p-4 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className={`rounded px-2 py-1 ${ride.paymentMethod.type === 'apple_pay' ? 'bg-black' : 'bg-white'}`}>
                            {ride.paymentMethod.type === 'apple_pay' ? (
                                <span className="material-symbols-outlined text-white text-sm">logo_dev</span>
                            ) : (
                                <img src={ride.paymentMethod.icon} alt="Payment" className="h-3" />
                            )}
                        </div>
                        <span className="text-sm">
                            {ride.paymentMethod.label} 
                            {ride.paymentMethod.last4 ? ` **** ${ride.paymentMethod.last4}` : ''}
                        </span>
                    </div>
                    <span className="material-symbols-outlined text-gray-500">arrow_forward_ios</span>
                </div>
            </div>
         </div>

         <div className="p-4 border-t border-gray-800 bg-background-dark pb-8 flex flex-col gap-3">
            <button 
                onClick={handleConfirm}
                className="w-full h-14 rounded-xl bg-primary text-black font-bold text-lg hover:bg-yellow-400 transition-colors"
            >
                Confirm Booking
            </button>
            <button 
                onClick={handleCancel}
                className="w-full h-12 rounded-xl text-red-500 font-bold text-base hover:bg-red-500/10 transition-colors"
            >
                Cancel
            </button>
         </div>
      </div>
    </div>
  );
};

export default ReviewRideScreen;
