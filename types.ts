
export interface RideOption {
  id: string;
  name: string;
  price: number;
  timeAway: number;
  image: string;
  car: string;
  plate: string;
  rating: number;
}

export interface Location {
  address: string;
  name?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'apple_pay';
  label: string;
  icon: string;
  last4?: string;
  default?: boolean;
}

export interface RideState {
  pickup: Location | null;
  dropoff: Location | null;
  selectedRide: RideOption | null;
  status: 'idle' | 'booking' | 'confirmed' | 'arriving' | 'arrived' | 'completed';
  paymentMethod: PaymentMethod;
}

export type RideContextType = {
  ride: RideState;
  setPickup: (loc: Location) => void;
  setDropoff: (loc: Location) => void;
  selectRide: (ride: RideOption) => void;
  setStatus: (status: RideState['status']) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  resetRide: () => void;
};

// Global declarations
declare global {
  interface Window {
    google: any;
    Stripe: any;
  }
  var google: any;
}
