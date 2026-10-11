import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wmxfwzhbwzbaacxkuqab.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteGZ3emhid3piYWFjeGt1cWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2NjE5NjYsImV4cCI6MjEwNzIzNzk2Nn0.R_SmJTkxJq3lyRxdHCeoINQ-cxUrrgv-Ol2YIxOg9YA'

export const supabase = createClient(supabaseUrl, supabaseKey)
