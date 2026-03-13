create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  x_handle text,
  facebook_url text,
  youtube_url text,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
