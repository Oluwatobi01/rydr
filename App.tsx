
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { RideContextType, RideState, Location, RideOption, PaymentMethod } from './types';

// Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import OtpScreen from './screens/OtpScreen';
import HomeScreen from './screens/HomeScreen';
import DestinationScreen from './screens/DestinationScreen';
import ChooseRideScreen from './screens/ChooseRideScreen';
import ReviewRideScreen from './screens/ReviewRideScreen';
import RideProgressScreen from './screens/RideProgressScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import ProfileScreen from './screens/ProfileScreen';
import PaymentScreen from './screens/PaymentScreen';
import OffersScreen from './screens/OffersScreen';
import HistoryScreen from './screens/HistoryScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';

// Context
const RideContext = createContext<RideContextType | undefined>(undefined);

export const useRide = () => {
  const context = useContext(RideContext);
  if (!context) throw new Error("useRide must be used within a RideProvider");
  return context;
};

const defaultPaymentMethod: PaymentMethod = {
  id: 'apple_pay',
  type: 'apple_pay',
  label: 'Apple Pay',
  icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMIutYodIw0y8kivG3SRJcj7xiyL1U2gSD7h-AKm6XSJZMYJjWafzAfQ7c8NxEErpLh3fQe-qPBQIyoyLKFZi8MZHquQUDK2ND2yn-BQ4NmXRtCjvG5bAPkc3AT_olbpaXQuZ3acSvi9sU4-y4DkYILqOvhMUTV90ef8QD7FKugU8HSwEGbTwUJDk_lhI3TyNoCub4jlf9N3DLt7MZh7X1GP9iDfGq-5KT9fY91RVKondDEOR7ErxY8bAg0rPm7Izx1tYtL6D2Vzg'
};

const RideProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ride, setRide] = useState<RideState>({
    pickup: { address: 'Fetching location...', name: 'Current Location' },
    dropoff: null,
    selectedRide: null,
    status: 'idle',
    paymentMethod: defaultPaymentMethod,
  });

  const setPickup = (loc: Location) => setRide(p => ({ ...p, pickup: loc }));
  const setDropoff = (loc: Location) => setRide(p => ({ ...p, dropoff: loc }));
  const selectRide = (r: RideOption) => setRide(p => ({ ...p, selectedRide: r }));
  const setStatus = (s: RideState['status']) => setRide(p => ({ ...p, status: s }));
  const setPaymentMethod = (m: PaymentMethod) => setRide(p => ({ ...p, paymentMethod: m }));
  
  const resetRide = () => setRide(p => ({
    ...p,
    dropoff: null,
    selectedRide: null,
    status: 'idle',
    // We preserve the current pickup location and payment method
  }));

  return (
    <RideContext.Provider value={{ ride, setPickup, setDropoff, selectRide, setStatus, setPaymentMethod, resetRide }}>
      {children}
    </RideContext.Provider>
  );
};

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <RideProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="font-display bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white max-w-md mx-auto shadow-2xl overflow-hidden relative">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/otp" element={<OtpScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/destination" element={<DestinationScreen />} />
            <Route path="/choose-ride" element={<ChooseRideScreen />} />
            <Route path="/review" element={<ReviewRideScreen />} />
            <Route path="/progress" element={<RideProgressScreen />} />
            <Route path="/feedback" element={<FeedbackScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/offers" element={<OffersScreen />} />
            <Route path="/history" element={<HistoryScreen />} />
            <Route path="/static/:title" element={<PlaceholderScreen />} />
          </Routes>
        </div>
      </HashRouter>
    </RideProvider>
  );
}
