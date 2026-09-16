import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const phaseEnum = z.enum(['plan', 'code', 'ship', 'test', 'repeat']);

const pointSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

const stepSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const modeSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

const seoSchema = z.object({
  title: z.string().min(10).max(70),
  description: z.string().min(20).max(200),
  ogImage: z.string().optional(),
  canonical: z.string().optional(),
});

const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/services" }),
  schema: z.object({
    seo: seoSchema,
    icon: z.string(),
    order: z.number(),
    summary: z.string(),
    phase: z.array(phaseEnum),
    kicker: z.string(),
    title: z.string(),
    lead: z.string(),
    body: z.string().optional(),
    points: z.array(pointSchema),
    ctaText: z.string(),
    ctaHref: z.string().optional(),
    quote: z.object({ label: z.string(), text: z.string() }).optional(),
    audience: z.array(z.string()).optional(),
    steps: z.array(stepSchema).optional(),
    includes: z.array(z.string()).optional(),
    faqs: z.array(faqSchema).optional(),
    modes: z.array(modeSchema).optional(),
    capabilities: z.array(pointSchema).optional(),
    capabilitiesFootnote: z.object({ label: z.string(), text: z.string(), ctaLabel: z.string() }).optional(),
    contact: z.object({ eyebrow: z.string(), title: z.string(), sub: z.string() }).optional(),
  }),
});

const cycleStepSchema = z.object({
  label: z.string(),
  title: z.string(),
  description: z.string(),
  tasks: z.array(z.string()),
});

const itemSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  href: z.string().optional(),
  label: z.string().optional(),
  featured: z.boolean().optional(),
});

const home = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/home" }),
  schema: z.object({
    type: z.enum(['hero', 'problema', 'modelo', 'personas', 'capacidades', 'loQueConstruimos', 'loQueCambia', 'metodologia', 'resultados', 'experiencia', 'faq', 'contacto']),
    order: z.number(),
    eyebrow: z.string().optional(),
    h2: z.string().optional(),
    intro: z.string().optional(),
    items: z.array(itemSchema).optional(),
    faqs: z.array(faqSchema).optional(),
    h1Top: z.string().optional(),
    h1Highlight: z.string().optional(),
    sub: z.string().optional(),
    primaryCta: z.object({ label: z.string(), href: z.string(), target: z.string().optional() }).optional(),
    secondaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
    cycle: z.object({ steps: z.array(cycleStepSchema) }).optional(),
    badge: z.string().optional(),
    text: z.string().optional(),
    panel: z.string().optional(),
    email: z.object({ label: z.string(), address: z.string() }).optional(),
    calendar: z.object({ label: z.string(), text: z.string(), href: z.string() }).optional(),
  }),
});

export const collections = {
  'services': services,
  'home': home,
};
