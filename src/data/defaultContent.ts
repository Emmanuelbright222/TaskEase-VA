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
      description: 'Proactive email triage, scheduling, and guardrails that protect deep work.'
    },
    {
      id: 'service-2',
      title: 'Systems + SOP Buildout',
      description: 'ClickUp/Notion/HubSpot setups, process documentation, and automation audits.'
    },
    {
      id: 'service-3',
      title: 'Client + Team Ops',
      description: 'Onboarding flows, reporting, and async updates that keep everyone aligned.'
    }
  ],
  projects: [
    {
      id: 'project-1',
      name: 'ClickUp Revamp',
      description: 'Reduced task turnaround time by 42% by restructuring ClickUp for a 15-person product team.',
      metrics: '42% faster turnaround · 0 missed deadlines',
      tags: ['ClickUp', 'Automation']
    },
    {
      id: 'project-2',
      name: 'Executive Ops Suite',
      description: 'Built a unified Notion HQ, CRM, and meeting insights for a seed-stage founder.',
      metrics: '10h/week saved · 1 source of truth',
      tags: ['Notion', 'Delegation']
    }
  ],
  testimonials: [
    {
      id: 'testimonial-1',
      name: 'Amelia Roth · CEO, Loomly Labs',
      quote: 'Jordan has a quiet, calming confidence. Within weeks our leadership team had more headspace than we had in years.',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80'
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
