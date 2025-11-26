
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../components/Map';
import { useGeolocation } from '../hooks/useGeolocation';
import { useRide } from '../App';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { location } = useGeolocation();
  const { setPickup } = useRide();

  // Reverse Geocoding: Get address from lat/lng
  useEffect(() => {
    if (location && window.google?.maps) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location }, (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address;
          // Clean up address for display (remove country if too long)
          const shortAddress = address.replace(', USA', '');
          
          setPickup({
            address: shortAddress,
            name: 'Current Location'
          });
        }
      });
    }
  }, [location, setPickup]);

  const menuItems = [
    { label: 'Profile', icon: 'person', path: '/profile' },
    { label: 'Payment', icon: 'credit_card', path: '/payment' },
    { label: 'Offers', icon: 'local_offer', path: '/offers' },
    { label: 'History', icon: 'history', path: '/history' },
    { label: 'Settings', icon: 'settings', path: '/static/settings' },
  ];

  return (
    <div className="relative h-screen w-full bg-background-dark overflow-hidden">
      {/* Real Map */}
      <div className="absolute inset-0">
         <Map 
            center={location} 
            zoom={15}
            markers={[{ lat: location.lat, lng: location.lng, title: 'You are here' }]}
         />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-6 flex justify-between items-center z-10 pointer-events-none">
        <button 
          onClick={() => setMenuOpen(true)}
          className="size-12 rounded-full bg-background-dark/80 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:bg-background-dark pointer-events-auto transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className="size-12 rounded-full bg-background-dark/80 backdrop-blur-sm overflow-hidden shadow-lg border-2 border-transparent hover:border-primary transition-colors pointer-events-auto"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr1gzZj1D8Gcm9Z3qcWjA1meAkmraMrJgcBzXpYY1o3TwR9ZHiasOOTCsTi2qCNAS5RTzEnWZnjELoqlqgLjkTRvl1M2PhKtw8k2LuXdLoHJ9IYf0w3NvQD0RktVfMEBwzbuqyzC69mVQdI27xZ3Gyl7Sm88vmYGurDchSW-lJUJffnpcGEDcJpDkcSSrn4o_ZSxKktTEsYPl6OhWXjjcLqKNcek7K72vfRK7aRwrGm3nY2t5mx6ZIJzZKxYClzU7OHxGLjg2i1To" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </button>
      </div>

      {/* Side Menu Drawer */}
      {menuOpen && (
        <div className="absolute inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)}></div>
          <div className="absolute top-0 left-0 bottom-0 w-3/4 max-w-xs bg-background-dark p-6 shadow-2xl flex flex-col gap-6 animate-slide-right border-r border-white/5">
             <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Rydr</h2>
                <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
             </div>
             <nav className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => navigate(item.path)} 
                    className="flex items-center gap-4 text-white p-3 hover:bg-white/10 rounded-lg transition-colors text-left"
                  >
                    <span className="material-symbols-outlined w-6">{item.icon}</span> {item.label}
                  </button>
                ))}
             </nav>
             <div className="mt-auto border-t border-white/10 pt-4">
                <button onClick={() => navigate('/static/help')} className="flex items-center gap-4 text-gray-400 p-3 hover:text-white transition-colors text-left w-full">
                    <span className="material-symbols-outlined w-6">help</span> Help & Support
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Bottom Search */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent">
        <div 
          onClick={() => navigate('/destination')}
          className="flex items-center bg-[#2A2A2A] rounded-xl h-16 shadow-2xl cursor-pointer group hover:bg-[#333] transition-colors border border-white/5"
        >
          <div className="h-full w-16 bg-primary rounded-l-xl flex items-center justify-center text-background-dark">
            <span className="material-symbols-outlined text-3xl">search</span>
          </div>
          <div className="flex-1 px-4 text-lg text-gray-400 group-hover:text-white transition-colors">
            Where are you going?
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
