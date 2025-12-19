
// Helper to get environment variables with fallback
const getEnv = (key: string, fallback: string) => {
  // @ts-ignore - import.meta.env is available in Vite
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    // @ts-ignore
    return import.meta.env[key];
  }
  return fallback;
};

export const CONFIG = {
  SUPABASE: {
    URL: getEnv('VITE_SUPABASE_URL', 'https://zrknucnbqaqbxcgtsgcb.supabase.co'),
    ANON_KEY: getEnv('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpya251Y25icWFxYnhjZ3RzZ2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTE2NjcsImV4cCI6MjA3OTcyNzY2N30._uChEVTwxID9eFt2mTDf7Yi9MtG-kqNQWI01vSyW5vo'),
  },
  STRIPE: {
    PUBLISHABLE_KEY: getEnv('VITE_STRIPE_KEY', 'pk_test_51SSFh4AbyAigNf3UBeZ5k0BK0rFbYbbdZVa0251iEFcRiTSLqFOnCQRRUSVdU3TpjZRz6ZHAfKtTD0fICCVzlImw009xzd3TH9'),
  },
  GOOGLE_MAPS: {
    // Note: This key is also used in index.html for the script tag
    // For index.html, it must be replaced at build time or manually in the HTML file
    API_KEY: getEnv('VITE_GOOGLE_MAPS_KEY', 'AIzaSyCY62oTzMAnvpKSUmfvdliYIZoMHH73HiY'),
  },
};
