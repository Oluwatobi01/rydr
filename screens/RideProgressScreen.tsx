
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRide } from '../App';
import Map from '../components/Map';

const RideProgressScreen: React.FC = () => {
  const navigate = useNavigate();
  const { ride, resetRide } = useRide();
  const [minutes, setMinutes] = useState(ride.selectedRide?.timeAway || 8);
  const [statusText, setStatusText] = useState("Your driver is on the way.");
  const [progress, setProgress] = useState(30);
  const [driverLocation, setDriverLocation] = useState({ lat: 40.715, lng: -74.008 });
  
  // Real-time fare state
  const [currentFare, setCurrentFare] = useState(ride.selectedRide?.price || 0);
  const [trafficAlert, setTrafficAlert] = useState<string | null>(null);

  useEffect(() => {
    // Simulate ride progress
    const interval = setInterval(() => {
        setMinutes(prev => {
            if (prev <= 1) {
                clearInterval(interval);
                setTimeout(() => navigate('/feedback'), 2000);
                return 0;
            }
            return prev - 1;
        });
        setProgress(prev => Math.min(prev + 10, 100));
        
        // Simulate driver moving
        setDriverLocation(prev => ({
            lat: prev.lat + 0.0005,
            lng: prev.lng + 0.0005
        }));

        // Simulate random traffic fare update (Rare event)
        if (Math.random() > 0.9 && !trafficAlert && currentFare < (ride.selectedRide?.price || 0) + 3) { 
             const increasedFare = currentFare + 2.50;
             setCurrentFare(increasedFare);
             setTrafficAlert("Heavy traffic detected. Fare updated.");
             setTimeout(() => setTrafficAlert(null), 5000);
        }

    }, 2000); // Speed up for demo

    if (minutes < 3) setStatusText("Arriving soon...");
    if (minutes === 0) setStatusText("Driver has arrived!");

    return () => clearInterval(interval);
  }, [minutes, navigate, trafficAlert, currentFare, ride.selectedRide]);

  const handleCancelRide = () => {
    const confirm = window.confirm("Are you sure you want to cancel your ride?");
    if (confirm) {
      resetRide();
      navigate('/home');
    }
  };

  const handleAction = (action: string) => {
    window.alert(`${action} functionality would open here.`);
  };

  if (!ride.selectedRide) return null;

  return (
    <div className="h-screen w-full relative bg-background-dark text-white">
      {/* Map Tracking */}
      <div className="absolute inset-0">
         <Map 
            center={driverLocation} 
            zoom={15}
            markers={[
                { lat: 40.7128, lng: -74.0060, title: 'You' }, // User
                { lat: driverLocation.lat, lng: driverLocation.lng, title: 'Driver', icon: 'http://maps.google.com/mapfiles/kml/shapes/cabs.png' } // Driver
            ]}
         />
      </div>
      
      <div className="absolute top-4 left-4 z-10">
          <button onClick={() => navigate('/home')} className="size-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur">
              <span className="material-symbols-outlined">arrow_back</span>
          </button>
      </div>

      {/* Traffic Alert Notification */}
      {trafficAlert && (
          <div className="absolute top-20 left-4 right-4 z-10 bg-black/80 backdrop-blur-md p-3 rounded-xl flex items-center gap-3 animate-fade-in border border-yellow-500/50 shadow-lg">
              <span className="material-symbols-outlined text-yellow-500">warning</span>
              <div>
                  <p className="text-sm font-bold text-white">Fare Update</p>
                  <p className="text-xs text-gray-300">{trafficAlert}</p>
              </div>
              <span className="ml-auto text-yellow-400 font-bold">+ $2.50</span>
          </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-background-dark rounded-t-3xl shadow-2xl p-6 pb-10">
         <div className="flex justify-center mb-4">
            <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
         </div>

         <div className="flex justify-between items-end mb-1">
             <h1 className="text-3xl font-bold">{minutes > 0 ? `Arriving in ${minutes} min` : "Arrived"}</h1>
             <p className="text-xl font-bold text-primary">${currentFare.toFixed(2)}</p>
         </div>
         <p className="text-gray-400 mb-4">{statusText}</p>

         {/* Progress Bar */}
         <div className="h-2 w-full bg-gray-800 rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }}></div>
         </div>

         <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
                <img src={ride.selectedRide.image} className="w-14 h-14 rounded-full object-cover border-2 border-primary" alt="Driver"/>
                <div>
                    <h3 className="font-bold text-lg">{ride.selectedRide.name}</h3>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-primary text-sm filled">star</span>
                        <span className="text-sm text-gray-400">{ride.selectedRide.rating}</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-lg">{ride.selectedRide.car}</p>
                <p className="text-sm text-gray-400 uppercase tracking-wider">{ride.selectedRide.plate}</p>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4 mb-4">
            <button 
                onClick={() => handleAction('Message')}
                className="h-12 rounded-xl bg-[#1E1E1E] flex items-center justify-center gap-2 hover:bg-[#2A2A2A]"
            >
                <span className="material-symbols-outlined text-primary">chat</span>
                <span className="font-medium">Message</span>
            </button>
            <button 
                onClick={() => handleAction('Call')}
                className="h-12 rounded-xl bg-[#1E1E1E] flex items-center justify-center gap-2 hover:bg-[#2A2A2A]"
            >
                <span className="material-symbols-outlined text-primary">call</span>
                <span className="font-medium">Call</span>
            </button>
         </div>

         <button 
            onClick={() => handleAction('Safety Center')}
            className="flex items-center justify-between bg-[#1E1E1E] p-4 rounded-xl mb-4 w-full hover:bg-[#2A2A2A]"
         >
             <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-500">health_and_safety</span>
                <span className="font-bold">Safety</span>
             </div>
             <span className="material-symbols-outlined text-gray-500">more_horiz</span>
         </button>
         
         <button 
           onClick={handleCancelRide}
           className="w-full h-12 rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500/20 transition-colors"
         >
           Cancel Ride
         </button>
      </div>
    </div>
  );
};

export default RideProgressScreen;
