
import { CONFIG } from './config';

export const getStripe = () => {
  if (window.Stripe) {
    return window.Stripe(CONFIG.STRIPE.PUBLISHABLE_KEY);
  }
  return null;
};
