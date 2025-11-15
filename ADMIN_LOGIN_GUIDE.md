# Admin Login Guide

## Quick Access

**Login URL**: `http://localhost:5173/admin/login` (or your domain + `/admin/login`)

You can also click the **"Admin"** link in the website footer.

## Prerequisites

You need to set up Supabase authentication first. Follow these steps:

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project name: `TaskEase-VA` (or your choice)
   - Database password: (save this securely)
   - Region: Choose closest to you
5. Click "Create new project"
6. Wait for project to initialize (2-3 minutes)

### Step 2: Set Up Database Tables

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy and paste the entire contents of `supabase/schema.sql` from this project
4. Click **"Run"** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

### Step 3: Enable Email/Password Authentication

1. In Supabase, go to **Authentication** → **Providers** (left sidebar)
2. Find **"Email"** provider
3. Make sure it's **enabled** (toggle should be ON)
4. You can configure email templates if needed (optional)

### Step 4: Create Admin User

You have two options:

#### Option A: Using Supabase Dashboard (Easiest)

1. Go to **Authentication** → **Users** (left sidebar)
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - **Email**: `admin@yourdomain.com` (use your email)
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ Check this box
4. Click **"Create user"**
5. **Save these credentials** - you'll use them to log in!

#### Option B: Using SQL (Alternative)

1. Go to **SQL Editor**
2. Run this query (replace with your email and password):

```sql
-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@yourdomain.com',  -- CHANGE THIS
  crypt('your-password-here', gen_salt('bf')),  -- CHANGE THIS
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);
```

**Note**: Option A is much easier and recommended!

### Step 5: Configure Environment Variables

1. In your project root, create a `.env` file (if it doesn't exist)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these:**
- Go to Supabase project → **Settings** → **API**
- **Project URL** = `VITE_SUPABASE_URL`
- **anon/public key** = `VITE_SUPABASE_ANON_KEY`

### Step 6: Restart Dev Server

If your dev server is running, restart it to load the new environment variables:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## Logging In

1. **Open your browser** and go to: `http://localhost:5173/admin/login`
   - Or click the **"Admin"** link in the footer

2. **Enter your credentials**:
   - Email: The email you used when creating the admin user
   - Password: The password you set

3. Click **"Sign In"**

4. If successful, you'll be redirected to `/admin` (the dashboard)

## Troubleshooting

### "Invalid login credentials"
- Make sure you created the user in Supabase
- Check that email/password are correct
- Verify the user is confirmed (Auto Confirm should be checked)

### "Supabase credentials are missing"
- Check your `.env` file exists and has the correct variables
- Make sure variable names start with `VITE_`
- Restart your dev server after adding `.env` file

### "Network error" or "Failed to fetch"
- Check your Supabase project is active (not paused)
- Verify the `VITE_SUPABASE_URL` is correct
- Check your internet connection

### Can't see the login page
- Make sure you're going to `/admin/login` (not just `/admin`)
- Check the browser console for errors
- Verify the dev server is running

## Security Notes

- **Never commit your `.env` file** to Git (it's already in `.gitignore`)
- Use a **strong password** for your admin account
- Consider enabling **2FA** in Supabase for extra security
- The admin dashboard is protected - only authenticated users can access it

## Next Steps

Once logged in, you can:
- Update Hero section (name, title, image, Calendly URL)
- Edit About section
- Manage Services, Projects, Testimonials, Tools
- Configure Pricing and Blog sections
- View and manage Contact messages

Happy managing! 🎉

