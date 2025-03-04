
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// Get the Clerk publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if the key is available
if (!PUBLISHABLE_KEY) {
  console.warn("Missing Clerk Publishable Key - authentication features will not work properly");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY || "pk_test_placeholder"}>
    <App />
  </ClerkProvider>
);
