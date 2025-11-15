import type { HeroContent, PortfolioData } from '../types/portfolio';

export const heroFallback: HeroContent = {
  name: 'Jordan Avery',
  title: 'Fractional Virtual Assistant',
  subtitle: 'I streamline operations and reclaim time for busy founders using AI, automation, and a calm presence.',
  avatarUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80',
  calendlyUrl: 'https://calendly.com/you',
  contactCta: 'Contact Me',
  callToAction: 'Book a Call'
};

export const defaultPortfolioData: PortfolioData = {
  about: {
    title: 'An extension of your leadership team',
    body:
      'I have spent the last six years supporting CEOs and operators across SaaS, eCommerce, and agency teams. I build calm, efficient systems, document everything, and communicate proactively so you can stay focused on high-leverage work.'
  },
  services: [
    {
      id: 'service-1',
      title: 'Inbox + Calendar Ownership',
      description: 'Proactive email triage, scheduling, and guardrails that protect deep work.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'service-2',
      title: 'Systems + SOP Buildout',
      description: 'ClickUp/Notion/HubSpot setups, process documentation, and automation audits.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'service-3',
      title: 'Client + Team Ops',
      description: 'Onboarding flows, reporting, and async updates that keep everyone aligned.',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    }
  ],
  projects: [
    {
      id: 'project-1',
      name: 'ClickUp Revamp',
      description: 'Reduced task turnaround time by 42% by restructuring ClickUp for a 15-person product team.',
      metrics: ['42% faster turnaround', '0 missed deadlines'],
      tags: ['ClickUp', 'Automation']
    },
    {
      id: 'project-2',
      name: 'Executive Ops Suite',
      description: 'Built a unified Notion HQ, CRM, and meeting insights for a seed-stage founder.',
      metrics: ['10h/week saved', '1 source of truth'],
      tags: ['Notion', 'Delegation']
    }
  ],
  testimonials: [
    {
      id: 'testimonial-1',
      name: 'Amelia Roth · CEO, Loomly Labs',
      quote: 'Jordan has a quiet, calming confidence. Within weeks our leadership team had more headspace than we had in years.',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
      rating: 5
    },
    {
      id: 'testimonial-2',
      name: 'Marcus Chen · Founder, TechFlow Inc',
      quote: 'The systems Jordan built saved us 15+ hours per week. Our team can finally focus on what matters—building great products.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5
    },
    {
      id: 'testimonial-3',
      name: 'Sarah Mitchell · COO, Growth Partners',
      quote: 'Working with Jordan transformed how we operate. The documentation and processes are so clear, onboarding new team members is effortless.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5
    },
    {
      id: 'testimonial-4',
      name: 'David Park · CEO, ScaleUp Solutions',
      quote: 'Best investment we made this year. Jordan handles everything from email management to client onboarding—I can finally focus on strategy.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      rating: 5
    },
    {
      id: 'testimonial-5',
      name: 'Emily Rodriguez · Founder, Creative Agency Co',
      quote: 'Jordan\'s attention to detail is unmatched. Every process is documented, every system is optimized. It\'s like having a COO without the overhead.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
      rating: 5
    },
    {
      id: 'testimonial-6',
      name: 'James Wilson · Executive Director, NonProfit Hub',
      quote: 'The automation and systems Jordan implemented increased our efficiency by 40%. We\'re serving more clients with the same resources.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5
    }
  ],
  tools: [
    { id: 'tool-1', name: 'Notion', category: 'Workspace', proficiency: 'Expert' },
    { id: 'tool-2', name: 'ClickUp', category: 'Project Ops', proficiency: 'Advanced' },
    { id: 'tool-3', name: 'Zapier', category: 'Automation', proficiency: 'Advanced' },
    { id: 'tool-4', name: 'Airtable', category: 'Database', proficiency: 'Advanced' }
  ],
  pricing: {
    enabled: true,
    plans: [
      {
        id: 'plan-1',
        title: 'Systems Sprint',
        price: '$2,800',
        description: '2-week async project to design or clean up an ops system.',
        features: ['Audit + systems map', 'Implementation + training', 'Hand-off playbook']
      },
      {
        id: 'plan-2',
        title: 'Embedded Operator',
        price: 'Starting at $2,400/mo',
        description: '40 flexible hours each month across ops, comms, and systems.',
        features: ['Dedicated async channel', 'Weekly ops review', 'Quarterly planning support']
      }
    ]
  },
  blog: {
    enabled: true,
    posts: [
      {
        id: 'post-1',
        title: 'Delegation Playbook for Founders',
        excerpt: 'A simple three-step audit to move work off your plate this quarter.',
        publishedAt: '2024-08-10',
        tags: ['Delegation', 'Leadership']
      }
    ]
  }
};
