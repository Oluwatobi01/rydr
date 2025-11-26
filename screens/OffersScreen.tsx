import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OffersScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'promotions' | 'discounts' | 'referrals'>('promotions');

  const handleApply = () => {
    window.alert('Code Applied!');
  };

  const handleRefer = () => {
    // In a real app this would trigger native share sheet
    if (navigator.share) {
        navigator.share({
            title: 'Join Rydr',
            text: 'Sign up for Rydr with my code ALEX123 and get a free ride!',
            url: 'https://rydr.app/invite/ALEX123',
        }).catch(console.error);
    } else {
        window.alert('Referral link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white">
        <header className="sticky top-0 z-10 bg-background-dark/95 backdrop-blur p-4 pb-2 flex items-center">
            <button onClick={() => navigate('/home')} className="p-2"><span className="material-symbols-outlined text-2xl">arrow_back</span></button>
            <h1 className="flex-1 text-center font-bold text-lg mr-10">Offers & Rewards</h1>
        </header>

        <nav className="flex border-b border-white/10 px-4 sticky top-[60px] bg-background-dark/95 backdrop-blur z-10">
            <button 
                onClick={() => setActiveTab('promotions')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'promotions' ? 'border-primary text-white' : 'border-transparent text-gray-500'}`}
            >
                Promotions
            </button>
            <button 
                onClick={() => setActiveTab('discounts')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'discounts' ? 'border-primary text-white' : 'border-transparent text-gray-500'}`}
            >
                Discounts
            </button>
            <button 
                onClick={() => setActiveTab('referrals')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'referrals' ? 'border-primary text-white' : 'border-transparent text-gray-500'}`}
            >
                Referrals
            </button>
        </nav>

        <main className="flex-1 p-4 flex flex-col gap-4">
            {activeTab === 'promotions' && (
                <div className="animate-fade-in flex flex-col gap-4">
                    <h2 className="text-xl font-bold py-2">Current Promotions</h2>
                    <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/5">
                        <div className="h-32 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCAue7mmYIqxZoZvwEmoM8fLHRGDQwMUEusYeCN9vzS-G6sT1PQQdqrhLxoaeqba8wc6BNSohwYy93qcezzpGIlrXvb19vsGBzjX_drrnK_9geoJ1Cfsi-o1hnS-KhPzL-dOKralNUiR6056IBQ1XhhXWnQij0RI-zm-NpT-SsNm7R6kGw3WnQIVzXQ_9hHG-DGpnNH-lLwMJdiHezHBAZ3F39Hp_fi9gFsUSYz6rvlQph1htjzRhuQygoD3V20D_DkpT-HP-xvuQ0")' }}></div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">50% Off Your Next Ride</h3>
                            <p className="text-gray-400 text-sm mb-3">Enjoy half off on your upcoming trip this week.</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 font-bold uppercase">Expires in 3 days</span>
                                <button onClick={handleApply} className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:bg-yellow-400">Apply Code</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/5">
                        <div className="h-32 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCiZ_SCtZ4c6G_QmG6Q4yNzg69hvUePa83EZqsvh66maPGBR8vAUej2N2zgw1xK1Af6ZEfQeyvNa-AQXzNt-YuOYiBQY9m3mA-NnNh0yTfUD4MtXzNzILqQ8Sd2jDiz1IfznPx1v9kDIQKDeOznbaxXtprSAKKmd-P65cQPqiMOu5ckU9FedhznxTis86cdMakRpPmsT4XRXVXaFIx2MuW8wFFGxwBb9HDMQnqOU7dNn0dtRqiEwgajBFpD1WVOPtdEiF84z_ZiQPk")' }}></div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">Weekend Ride Discount</h3>
                            <p className="text-gray-400 text-sm mb-3">Get 20% off on all rides this Saturday and Sunday.</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 font-bold uppercase">Valid this weekend</span>
                                <button onClick={handleApply} className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:bg-yellow-400">Use Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'discounts' && (
                <div className="animate-fade-in flex flex-col items-center justify-center py-20 opacity-70">
                    <span className="material-symbols-outlined text-6xl mb-4 text-gray-500">sentiment_dissatisfied</span>
                    <h3 className="font-bold text-lg">No Coupons Available</h3>
                    <p className="text-gray-400 text-center px-8">You don't have any active discount coupons at the moment. Check back later!</p>
                </div>
            )}

            {activeTab === 'referrals' && (
                <div className="animate-fade-in flex flex-col gap-4">
                    <div className="bg-white/5 rounded-xl p-6 text-center mt-2 border border-white/10">
                        <span className="material-symbols-outlined text-4xl text-primary mb-2">diversity_3</span>
                        <h3 className="font-bold text-lg text-white">Invite Friends, Get Rewards</h3>
                        <p className="text-gray-400 text-sm mt-2 mb-6">Share your code and you'll both get a free ride when they sign up!</p>
                        
                        <div className="bg-black/30 rounded-lg p-3 mb-6 flex justify-between items-center">
                            <span className="font-mono text-xl tracking-widest pl-2">ALEX123</span>
                            <span className="text-primary text-sm font-bold cursor-pointer" onClick={() => window.alert('Copied!')}>COPY</span>
                        </div>

                        <button onClick={handleRefer} className="w-full h-12 bg-primary text-black rounded-lg font-bold hover:bg-yellow-400">Refer a Friend</button>
                    </div>
                    
                    <h3 className="font-bold text-lg mt-4">Your Referrals</h3>
                    <div className="bg-[#1E1E1E] rounded-xl p-4 flex items-center gap-4 border border-white/5">
                        <div className="size-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center font-bold">JD</div>
                        <div className="flex-1">
                            <p className="font-bold text-white">Jane Doe</p>
                            <p className="text-xs text-gray-400">Signed up 2 days ago</p>
                        </div>
                        <span className="text-primary font-bold text-sm">Pending</span>
                    </div>
                </div>
            )}
        </main>
    </div>
  );
};

export default OffersScreen;