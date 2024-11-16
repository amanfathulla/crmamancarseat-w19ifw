-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Marketing contents table (Updated schema)
create table marketing_contents (
  id uuid default uuid_generate_v4() primary key,
  date date not null,
  title text not null,
  description text,
  platform text not null,
  status text default 'pending',
  time time not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  user_id uuid references auth.users(id)
);

-- Enable Row Level Security (RLS)
alter table marketing_contents enable row level security;

-- Create policies
create policy "Users can only access their own data" on marketing_contents
  for all using (auth.uid() = user_id);