# TaskEase VA - Customization Guide

## What You Have

You have a **complete, modern virtual assistant portfolio website** that's ready to customize. It's currently using placeholder content, but you can easily tailor it to your specific niche or use case.

## Current State

The website is a **template** with:
- ✅ All features built and working
- ✅ Modern UI with glassmorphism design
- ✅ Admin dashboard for content management
- ⚠️ Placeholder content that needs to be customized

## How to Customize

### Option 1: Use the Admin Dashboard (Recommended)

1. **Set up Supabase** (if not already done):
   - Create a Supabase project
   - Run the SQL schema from `supabase/schema.sql`
   - Create an admin user account

2. **Log in to Admin Dashboard**:
   - Go to `/admin/login` (or click "Admin" in the footer)
   - Sign in with your Supabase credentials

3. **Customize Content**:
   - **Hero Section**: Update name, title, subtitle, profile image, Calendly URL
   - **About**: Write your biography
   - **Services**: Add/edit your service offerings
   - **Projects**: Add case studies and results
   - **Testimonials**: Add client testimonials
   - **Tools**: List software you're proficient in
   - **Pricing**: Set up your pricing plans (or disable if not needed)
   - **Blog**: Add blog posts (or disable if not needed)

### Option 2: Update Default Content

Edit `src/data/defaultContent.ts` to change the fallback content that shows when Supabase isn't configured.

## Niche Examples

### Executive Assistant
- **Title**: "Executive Assistant & Operations Specialist"
- **Services**: Calendar Management, Travel Coordination, Executive Support
- **Tools**: Microsoft Office, Google Workspace, Asana

### E-commerce VA
- **Title**: "E-commerce Virtual Assistant"
- **Services**: Product Listing, Order Management, Customer Support
- **Tools**: Shopify, WooCommerce, Klaviyo

### Real Estate VA
- **Title**: "Real Estate Virtual Assistant"
- **Services**: Lead Management, CRM Updates, Marketing Support
- **Tools**: Follow Up Boss, Chime, Canva

### Social Media VA
- **Title**: "Social Media Manager & Content Creator"
- **Services**: Content Creation, Community Management, Analytics
- **Tools**: Canva, Buffer, Hootsuite

### Content Creation VA
- **Title**: "Content Creation & Marketing VA"
- **Services**: Blog Writing, SEO, Email Marketing
- **Tools**: WordPress, Grammarly, Mailchimp

## Quick Start Checklist

- [ ] Set up Supabase project
- [ ] Run database schema
- [ ] Create admin account
- [ ] Log in to admin dashboard
- [ ] Update Hero section (name, title, image, Calendly)
- [ ] Write About section
- [ ] Add your Services
- [ ] Add Projects/Case Studies
- [ ] Add Testimonials
- [ ] List your Tools
- [ ] Configure Pricing (or disable)
- [ ] Set up Blog (or disable)
- [ ] Test Contact Form
- [ ] Deploy to Vercel

## Design Customization

The design uses:
- **Primary Color**: Purple (`#7C3AED`) - defined in `tailwind.config.js`
- **Accent Color**: Blue (`#0EA5E9`)
- **Glassmorphism**: Applied via Tailwind classes
- **Dark Mode**: Toggle in navbar

To change colors, edit `tailwind.config.js`:
```js
colors: {
  primary: '#YOUR_COLOR',
  accent: '#YOUR_COLOR'
}
```

## Need Help?

- Check the main `README.md` for setup instructions
- Review the admin dashboard at `/admin/login`
- All content is editable through the dashboard once Supabase is configured

