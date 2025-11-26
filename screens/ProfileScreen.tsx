import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-8 text-white">
       <header className="flex items-center p-4 sticky top-0 bg-background-dark z-10">
         <button onClick={() => navigate('/home')} className="p-2"><span className="material-symbols-outlined text-2xl">arrow_back</span></button>
         <h1 className="flex-1 text-center text-lg font-bold mr-10">Profile</h1>
         <button onClick={() => navigate('/static/settings')} className="p-2"><span className="material-symbols-outlined text-2xl">settings</span></button>
       </header>

       <div className="flex flex-col items-center mt-4 mb-8">
          <div className="relative group cursor-pointer">
             <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhURYqfeZ_kzztFAyFU21GtvYMmDknNyrA-64ZE-guh-xU-SFOoF0ZlJLVDYqphCPGP0TU68bHefUQCmI0xJZCw1wNoezyX0PMYaVabzvBPLXR9JsolawUtpcnJHzTYDnymK2NNk3i0doOqtVEWSGdhM3PgAyYmFEZ3Swopb85YSXrfCg28XoOkfoZ_UNc8nXTMIfxlvHRxavnbwCZSoSgo5IqhPXd8AjGXYEvJ6CWQsN0x97b5ZBT6a_bVeIKseLZ-vXASdQrReo"
                className="w-32 h-32 rounded-full object-cover group-hover:opacity-80 transition-opacity"
                alt="Profile"
             />
             <button className="absolute bottom-0 right-0 size-9 rounded-full bg-primary text-black flex items-center justify-center border-4 border-background-dark">
                <span className="material-symbols-outlined text-sm">edit</span>
             </button>
          </div>
          <h2 className="text-2xl font-bold mt-4">Alex Rider</h2>
          <p className="text-gray-400">alex.rider@example.com</p>
       </div>

       <div className="px-4 space-y-6">
          <section>
             <h3 className="text-lg font-bold mb-2">Saved Locations</h3>
             <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/5">
                <div className="flex items-center p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer" onClick={() => navigate('/choose-ride')}>
                    <div className="size-10 rounded-lg bg-[#2A2A2A] flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined">home</span>
                    </div>
                    <span className="flex-1 font-medium">Home</span>
                    <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                </div>
                <div className="flex items-center p-4 hover:bg-white/5 cursor-pointer" onClick={() => navigate('/choose-ride')}>
                    <div className="size-10 rounded-lg bg-[#2A2A2A] flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined">work</span>
                    </div>
                    <span className="flex-1 font-medium">Work</span>
                    <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                </div>
             </div>
          </section>

          <section>
             <h3 className="text-lg font-bold mb-2">Settings</h3>
             <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/5">
                <div className="flex items-center p-4 border-b border-white/5 cursor-pointer hover:bg-white/5" onClick={() => navigate('/payment')}>
                    <div className="size-10 rounded-lg bg-[#2A2A2A] flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined">credit_card</span>
                    </div>
                    <span className="flex-1 font-medium">Payment Methods</span>
                    <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                </div>
                <div className="flex items-center p-4 border-b border-white/5 cursor-pointer hover:bg-white/5" onClick={() => navigate('/static/notifications')}>
                    <div className="size-10 rounded-lg bg-[#2A2A2A] flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined">notifications</span>
                    </div>
                    <span className="flex-1 font-medium">Notifications</span>
                    <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                </div>
                <div className="flex items-center p-4 cursor-pointer hover:bg-white/5" onClick={() => navigate('/static/security')}>
                    <div className="size-10 rounded-lg bg-[#2A2A2A] flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined">security</span>
                    </div>
                    <span className="flex-1 font-medium">Security & Privacy</span>
                    <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                </div>
             </div>
          </section>

          <section>
             <h3 className="text-lg font-bold mb-2">Support & Legal</h3>
             <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/5">
                <div className="flex items-center p-4 border-b border-white/5 cursor-pointer hover:bg-white/5" onClick={() => navigate('/static/help-center')}>
                    <div className="size-10 rounded-lg bg-[#2A2A2A] flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined">help</span>
                    </div>
                    <span className="flex-1 font-medium">Help Center</span>
                    <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                </div>
                <div className="flex items-center p-4 cursor-pointer hover:bg-white/5" onClick={() => navigate('/static/terms')}>
                    <div className="size-10 rounded-lg bg-[#2A2A2A] flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined">gavel</span>
                    </div>
                    <span className="flex-1 font-medium">Terms of Service</span>
                    <span className="material-symbols-outlined text-gray-500">chevron_right</span>
                </div>
             </div>
          </section>

          <button onClick={() => navigate('/login')} className="w-full h-14 rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500/20 transition-colors">
            Log Out
          </button>
       </div>
    </div>
  );
};

export default ProfileScreen;