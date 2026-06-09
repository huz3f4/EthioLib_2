# Setting up Supabase for EthioLib

To use the database features of EthioLib, follow these steps:

## 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New Project** and select your organization.
3. Enter a project name (e.g., `EthioLib`), database password, and choose a region near you.
4. Wait for the database to provision.

## 2. Get your API Keys
1. In your Supabase dashboard, go to **Project Settings** (gear icon) > **API**.
2. Copy the **Project URL** and the **`anon` public API key**.
3. Create a `.env` file in the root of your project or add them to the Secrets panel in AI Studio:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_APP_URL=https://your-app-domain.com
   ```
   `VITE_APP_URL` ensures Supabase confirmation emails return users to your app instead of localhost.


## 3. Run the SQL Schema
Go to the **SQL Editor** in the side menu and run the following script to set up your tables:

```sql
-- Books table
create table books (
  id text primary key,
  title text not null,
  author text,
  cover_url text,
  category text, -- 'curriculum', 'fiction', 'non-fiction', etc.
  grade_level integer, -- for curriculum books
  is_teachers_guide boolean default false,
  download_url text, -- external link to kehulum.com or similar
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Profiles table for user data
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  favorite_books text[] default array[]::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table books enable row level security;
alter table profiles enable row level security;

-- Policies for books (anyone can read)
create policy "Books are viewable by everyone" on books
  for select using (true);

-- Policies for profiles
create policy "Users can view their own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

-- Function to handle new user profile creation
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 4. Enable Google Login (Optional)
1. Go to **Authentication** > **Providers** > **Google**.
2. Enable it and follow the instructions to set up your Google Cloud Console credentials if you want social login.
