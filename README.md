# TaskEase VA

A modern virtual assistant portfolio built with React, Vite, Tailwind CSS, Supabase, and Resend. It ships with a public marketing site plus a secure admin dashboard for managing every section.

## Features

- ⚡️ **Hero, About, Services, Projects, Testimonials, Tools, Pricing, Blog, and Contact** sections with glassmorphism styling and animations.
- 🎯 **Admin dashboard** protected by Supabase Auth with CRUD controls for every data set.
- ✉️ **Contact form** sends transactional email via Resend and logs leads to Supabase.
- 🌓 Built-in **light/dark mode** toggle with persistence.
- 📱 Fully responsive, mobile-first UI with Tailwind CSS and Framer Motion transitions.
- ☁️ Ready for **Vercel** deployment using an `/api/contact` serverless function.

## Getting started

```bash
npm install
npm run dev
```

> Package installs require access to npm. If you are developing offline, mirror the dependencies defined in `package.json`.

## Environment variables

Create a `.env` file based on `.env.example`:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CONTACT_FORWARD_TO=
```

- `VITE_*` keys are exposed to the browser for the public Supabase client.
- `SUPABASE_SERVICE_ROLE_KEY` is **server-side only** and used in the Vercel API route to insert contact messages.
- `CONTACT_FORWARD_TO` is the inbox that should receive new inquiry notifications.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) inside the SQL editor to provision all tables.
3. Enable email/password authentication and create an admin user for dashboard access.
4. Configure Storage buckets if you plan to upload hero/profile images directly from the dashboard (the current UI expects URLs but can be extended).
5. Grab the project URL + anon key and drop them into `.env`.

## Resend setup

1. Create a Resend API key and verified domain.
2. Update `api/contact.ts` with the verified sender (`from` field) and deploy the function.
3. Set `RESEND_API_KEY` and `CONTACT_FORWARD_TO` in your Vercel project.

## Admin dashboard

- Visit `/admin/login` to authenticate with your Supabase credentials.
- After signing in, you can edit hero/about copy, toggle pricing/blog visibility, and manage CRUD resources (services, projects, testimonials, tools, pricing plans, blog posts).
- Contact inquiries can be refreshed or deleted from the dashboard.

## Deployment (Vercel)

1. Push this repo to GitHub and import it into Vercel.
2. Add the environment variables listed above to the Vercel project.
3. Vercel will build using `npm run build` and expose the `/api/contact` serverless function automatically.
4. After the first deploy, test the contact form to ensure emails + Supabase inserts work.

## Push the project to your own Git repo

Follow these steps if you opened the project in a blank folder and now want it on GitHub (or another Git provider):

1. **Create the remote repo.** Visit GitHub ➜ `New repository`, give it a name (for example `taskease-va`), and leave it empty (no README).
2. **Check whether Git is already initialized.**
   ```bash
   git status
   ```
   - If you see "fatal: not a git repository," initialize Git with `git init`.
3. **Add / update the remote origin.** Replace `<your-remote-url>` with the HTTPS or SSH URL from the repo you just created.
   ```bash
   git remote remove origin 2>/dev/null || true
   git remote add origin <your-remote-url>
   ```
4. **Choose your default branch.** Rename the current branch before committing if you want to use `main`.
   ```bash
   git branch -M main   # or keep the existing branch name (e.g., work)
   ```
5. **Commit the project files.**
   ```bash
   git add -A
   git commit -m "feat: build TaskEase VA portfolio and admin"
   ```
6. **Push to GitHub.**
   ```bash
   git push -u origin main   # or replace main with your branch name
   ```

From now on you only need to run `git add`, `git commit`, and `git push` whenever you make changes. GitHub will keep the remote repository in sync with your local code.

## Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/) + glassmorphism utilities
- [Supabase](https://supabase.com/) for Auth, Postgres, and Storage
- [Resend](https://resend.com/) for transactional email
- [Framer Motion](https://www.framer.com/motion/) for scroll animations

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts Vite dev server |
| `npm run build` | Runs TypeScript type check then Vite build |
| `npm run preview` | Serves the production build locally |

## Notes

- The dashboard `CrudList` component handles comma-separated tags/features for array columns.
- Supabase row-level security (RLS) should be enabled with policies allowing authenticated admins to read/write as appropriate.
- Image uploads can leverage Supabase Storage; update the hero/avatar URL inputs to use signed upload URLs if desired.
