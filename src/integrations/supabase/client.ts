
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dcrqkvrmamefgkxvkxoi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjcnFrdnJtYW1lZmdreHZreG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMjc3MDgsImV4cCI6MjA1NjgwMzcwOH0.Tc9e1ouEzvKU6KOXiqiN0qoro7Z7sC7NQg-ehieosVY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
  },
});
