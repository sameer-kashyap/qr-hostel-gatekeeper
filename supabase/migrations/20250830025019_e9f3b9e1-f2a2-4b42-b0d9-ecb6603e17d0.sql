-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Update visitors table to include timestamp and ensure it has proper structure
ALTER TABLE public.visitors 
ADD COLUMN IF NOT EXISTS check_in_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- Update RLS policies for visitors table to allow public access for visitor form
DROP POLICY IF EXISTS "Allow public to select visitors" ON public.visitors;
DROP POLICY IF EXISTS "Allow public to insert visitors" ON public.visitors;
DROP POLICY IF EXISTS "Allow public to delete visitors" ON public.visitors;

-- Create new policies - public can insert (visitor form), only authenticated can view/delete (admin panel)
CREATE POLICY "Allow public to insert visitors" 
ON public.visitors 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow authenticated to select visitors" 
ON public.visitors 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated to delete visitors" 
ON public.visitors 
FOR DELETE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated to update visitors" 
ON public.visitors 
FOR UPDATE 
USING (auth.role() = 'authenticated');