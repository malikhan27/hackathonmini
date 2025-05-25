import { createClient } from '@supabase/supabase-js'


const serviceKey = import.meta.env.VITE_supabase_service_key

export const supabase = createClient('https://nshamtibsrcayrsibero.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGFtdGlic3JjYXlyc2liZXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxODU1MTksImV4cCI6MjA1OTc2MTUxOX0.zeJbSf9iMJkXfu-ma8OY8gwneo4Mi0BLJIB026ODAYI')
export const supaAdmin = createClient('https://nshamtibsrcayrsibero.supabase.co',serviceKey)




 
 
 
 
 

