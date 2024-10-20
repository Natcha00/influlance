import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://hdiyccecjrludcfjsgmd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkaXljY2VjanJsdWRjZmpzZ21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MTMxODksImV4cCI6MjA0NDk4OTE4OX0.KB0xJ6bddEVboyz1rG0Wg2R1cPrg2AGh31-K-UPeR3E");