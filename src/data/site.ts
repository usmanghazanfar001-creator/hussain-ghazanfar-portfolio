/**
 * SITE CONTENT — edit this file to update names, contact details and copy.
 *
 * RULES (from the brief): do not invent qualifications, years of experience, awards,
 * registrations, testimonials or client projects. Empty contact fields are simply hidden
 * on the live site (they show a "Placeholder" tag only while running `npm run dev`).
 */

export const site = {
  name: 'Hussnain Ghazanfar',
  initials: 'HG',
  role: 'Architectural Designer',
  tagline: 'Shaping Spaces. Defining Visions.',
  specialties: ['AutoCAD 2D & 3D Designer', 'Architectural Visualization', 'Map & Site Planner'],
  /** Production URL. Set VITE_SITE_URL in .env / Vercel — used for canonical URLs, sitemap and structured data. */
  url: ((import.meta.env.VITE_SITE_URL as string | undefined) || 'https://www.example.com').replace(/\/$/, ''),
  seo: {
    title: 'Hussnain Ghazanfar | Architecture, AutoCAD & Master Planning',
    description:
      "Explore Hussnain Ghazanfar's architectural portfolio featuring architectural design, AutoCAD 2D drafting, 3D modeling, architectural visualization, and master planning.",
  },
} as const;

export const heroCopy = {
  eyebrow: 'Architecture · AutoCAD · Master Planning',
  headline: ['Architecture Beyond', 'Dimensions.'],
  text: 'Exploring the intersection of architectural design, technical precision, 3D visualization, and spatial planning.',
};

export const aboutCopy = {
  heading: 'Architecture through precision and creativity.',
  intro: [
    `${site.name} is an architectural designer working across architectural design, AutoCAD 2D drafting, AutoCAD 3D modeling, architectural visualization, map and site planning, and master planning.`,
    'The work moves from first concept to coordinated technical drawings and clear visual presentation — so an idea can be understood, reviewed and built.',
  ],
  /** EDITABLE: rewrite in your own words. */
  philosophy:
    'Good design starts with how a space is used. Each project is approached through careful planning, accurate documentation and a clear, restrained visual language.',
  capabilities: [
    'Architectural design and building layouts',
    'AutoCAD 2D technical and construction drawings',
    'AutoCAD 3D modeling and architectural visualization',
    'Site, land-use and road-network planning',
    'Residential and commercial master planning',
  ],
  /** Leave empty until verified. Example: { title: 'Role', org: 'Studio', period: '2020 – 2023' } */
  experience: [] as { title: string; org: string; period: string }[],
  qualifications: [] as { title: string; org: string; year: string }[],
};

export const contact = {
  heading: "Have a Vision? Let's Give It Form.",
  text: 'Tell me about your project — architectural design, drafting, 3D visualization or planning — and I will reply with the next steps.',
  cta: 'Start a Conversation',
  /** Fill these in to switch the matching rows and buttons on. Empty = hidden on the live site. */
  email: 'ranahussnainghazanfar9@gmail.com',
  /** Written in international format so it dials correctly from any country. */
  phone: '+92 305 6669735',
  /** Digits only, with country code. Same number as the phone — clear this if it is not on WhatsApp. */
  whatsapp: '923056669735',
  linkedin: '',
  location: '',
  /** Extra profiles, e.g. { label: 'Instagram', url: 'https://…' }. */
  socials: [] as { label: string; url: string }[],
  /** Add a real file, e.g. '/files/Hussnain-Ghazanfar-CV.pdf' (put it in /public/files). Empty = no CV button. */
  cvUrl: '',
  /** Optional Formspree / Basin / Getform endpoint. Empty = the form opens the visitor's email app (needs `email`). */
  formEndpoint: '',
  privacyNote: 'Your name, email and message are used only to reply to your enquiry and are not shared with third parties.',
};

export const navLinks = [
  { label: 'Projects', hash: 'projects' },
  { label: 'Services', hash: 'services' },
  { label: 'About', hash: 'about' },
  { label: 'Process', hash: 'process' },
  { label: 'Contact', hash: 'contact' },
];

export const processSteps = [
  { n: '01', title: 'Concept Development', text: 'Brief, site and ambitions are translated into early ideas, massing and spatial strategy.' },
  { n: '02', title: 'Planning & Research', text: 'Site analysis, regulations, access and land-use are studied to shape a workable layout.' },
  { n: '03', title: 'Technical Drafting', text: 'Plans, sections and elevations are drawn accurately in AutoCAD 2D for review and construction.' },
  { n: '04', title: '3D Modeling', text: 'The design is built in 3D to test proportion, light and relationships before it is built.' },
  { n: '05', title: 'Design Presentation', text: 'Drawings and visuals are organised into clear presentation sets for clients and stakeholders.' },
];

/** Skills. `level` (0–100) is omitted on purpose: bars appear only after real values are supplied. */
export const skills: { name: string; icon: string; level?: number }[] = [
  { name: 'AutoCAD 2D', icon: 'ruler' },
  { name: 'AutoCAD 3D', icon: 'box' },
  { name: 'Architectural Drafting', icon: 'pen' },
  { name: 'Architectural Visualization', icon: 'layers' },
  { name: 'Site Planning', icon: 'compass' },
  { name: 'Master Planning', icon: 'landmark' },
  { name: 'Technical Documentation', icon: 'file' },
];

/** Shown on every service page. Edit to match your real scope of work. */
export const scopeNote =
  'Drawings are prepared as design and drafting documentation. Statutory approvals and any licensed professional sign-off that a project requires are handled by appropriately registered professionals.';
