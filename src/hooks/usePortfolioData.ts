import useSWR from 'swr';
import { supabase } from '../lib/supabaseClient';
import { defaultPortfolioData, heroFallback } from '../data/defaultContent';
import type { HeroContent, PortfolioData } from '../types/portfolio';

export const fetchHero = async (): Promise<HeroContent> => {
  try {
    // First try to get a single row, if multiple exist, get the first one
    const { data, error } = await supabase.from('hero').select('*').limit(1).maybeSingle();
    if (error) {
      // If maybeSingle fails due to multiple rows, try getting first row
      const { data: firstData, error: firstError } = await supabase.from('hero').select('*').limit(1).single();
      if (firstError || !firstData) {
        console.warn('Falling back to local hero content', error?.message || firstError?.message);
        return heroFallback;
      }
      return {
        name: firstData.name,
        title: firstData.title,
        subtitle: firstData.subtitle,
        avatarUrl: firstData.avatar_url,
        calendlyUrl: firstData.calendly_url,
        contactCta: firstData.contact_cta,
        callToAction: firstData.cta_label
      };
    }
    if (!data) {
      return heroFallback;
    }
    return {
      name: data.name,
      title: data.title,
      subtitle: data.subtitle,
      avatarUrl: data.avatar_url,
      calendlyUrl: data.calendly_url,
      contactCta: data.contact_cta,
      callToAction: data.cta_label
    };
  } catch (err) {
    console.warn('Error fetching hero content, using fallback', err);
    return heroFallback;
  }
};

const fetchPortfolio = async (): Promise<PortfolioData> => {
  try {
    const [{ data: aboutData }, { data: services }, { data: projects }, { data: testimonials }, { data: tools }, { data: pricingRows }, { data: blogPosts } ] = await Promise.all([
      supabase.from('about').select('*').maybeSingle(),
      supabase.from('services').select('*').order('created_at', { ascending: true }),
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
      supabase.from('tools').select('*').order('created_at', { ascending: true }),
      supabase.from('pricing_plans').select('*').order('sort_order', { ascending: true }),
      supabase.from('blog_posts').select('*').order('published_at', { ascending: false })
    ]);

    return {
      about: {
        title: aboutData?.title ?? defaultPortfolioData.about.title,
        body: aboutData?.body ?? defaultPortfolioData.about.body
      },
      services: services?.map((service: any) => ({
        id: service.id,
        title: service.title,
        description: service.description,
        imageUrl: service.image_url
      })) ?? defaultPortfolioData.services,
      projects: projects?.map((project: any) => {
        // Normalize metrics to always be an array (handle both string and array from DB)
        let metrics = project.metrics;
        if (metrics && !Array.isArray(metrics)) {
          // If it's a string, try to split it (handle both comma and middle dot separators)
          if (typeof metrics === 'string') {
            metrics = metrics.split(/[·,]/).map((m: string) => m.trim()).filter(Boolean);
          } else {
            metrics = [];
          }
        } else if (!metrics) {
          metrics = [];
        }
        
        return {
          id: project.id,
          name: project.name,
          description: project.description,
          metrics: metrics,
          tags: project.tags || [],
          imageUrl: project.image_url,
          caseStudyUrl: project.case_study_url
        };
      }) ?? defaultPortfolioData.projects,
      testimonials: testimonials?.map((testimonial: any) => ({
        id: testimonial.id,
        name: testimonial.name,
        quote: testimonial.quote,
        avatar: testimonial.avatar,
        rating: testimonial.rating
      })) ?? defaultPortfolioData.testimonials,
      tools: tools && tools.length > 0 ? tools.map((tool: any) => ({
        id: tool.id,
        name: tool.name,
        category: tool.category,
        proficiency: tool.proficiency
      })) : [],
      pricing: {
        enabled: Boolean(aboutData?.show_pricing ?? defaultPortfolioData.pricing.enabled),
        plans:
          pricingRows?.map((plan: any) => ({
            id: plan.id,
            title: plan.title,
            price: plan.price,
            description: plan.description,
            features: plan.features ?? []
          })) ?? defaultPortfolioData.pricing.plans
      },
      blog: {
        enabled: Boolean(aboutData?.show_blog ?? defaultPortfolioData.blog.enabled),
        posts:
          blogPosts?.map((post: any) => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            publishedAt: post.published_at,
            tags: post.tags,
            coverImage: post.cover_image
          })) ?? defaultPortfolioData.blog.posts
      }
    };
  } catch (error) {
    console.warn('Falling back to default portfolio data', error);
    return defaultPortfolioData;
  }
};

export const useHeroContent = () => {
  return useSWR('hero', fetchHero, { 
    fallbackData: heroFallback, 
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 0,
    // Ensure data is always fresh
    dedupingInterval: 0
  });
};

export const usePortfolioData = () => {
  return useSWR('portfolio', fetchPortfolio, {
    fallbackData: defaultPortfolioData,
    revalidateOnFocus: false
  });
};
