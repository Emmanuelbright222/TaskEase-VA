create table if not exists hero (
  id uuid primary key default uuid_generate_v4(),
  name text,
  title text,
  subtitle text,
  avatar_url text,
  calendly_url text,
  contact_cta text,
  cta_label text,
  updated_at timestamptz default now()
);

create table if not exists about (
  id uuid primary key default uuid_generate_v4(),
  title text,
  body text,
  show_pricing boolean default true,
  show_blog boolean default true,
  updated_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  metrics text[],
  tags text[],
  image_url text,
  case_study_url text,
  created_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text,
  quote text,
  avatar text,
  rating integer check (rating >= 1 AND rating <= 5),
  created_at timestamptz default now()
);

create table if not exists tools (
  id uuid primary key default uuid_generate_v4(),
  name text,
  category text,
  proficiency text,
  created_at timestamptz default now()
);

create table if not exists pricing_plans (
  id uuid primary key default uuid_generate_v4(),
  title text,
  price text,
  description text,
  features text[],
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text,
  excerpt text,
  published_at timestamptz,
  tags text[],
  cover_image text,
  created_at timestamptz default now()
);

create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text,
  company text,
  message text,
  created_at timestamptz default now()
);
