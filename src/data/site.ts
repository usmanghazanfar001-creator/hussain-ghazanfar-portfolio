/**
 * SITE CONTENT — edit this file to update names, contact details and copy.
 *
 * RULES (from the brief): do not invent qualifications, years of experience,
 * awards, registrations, testimonials or client projects. Leave fields empty
 * until the client supplies verified information — the UI shows a clear
 * "placeholder" state for any empty field.
 */

export const site = {
  /** Spelling follows the supplied logo. Change here and everything updates. */
  name: 'Hussain Ghazanfar',
  initials: 'HG',
  role: 'Architectural Designer',
  specialties: ['AutoCAD 2D & 3D Designer', 'Map Planner', 'Site Planning Specialist'],
  /** Production URL. Also set VITE_SITE_URL in .env (used for sitemap, canonical, Open Graph). */
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://www.example.com',
  seo: {
    titleSuffix: 'Architecture & AutoCAD Designer',
    description:
      'Explore the architectural portfolio of Hussain Ghazanfar, specializing in architectural design, AutoCAD 2D and 3D drafting, site planning, and master planning.',
  },
} as const;

export const heroCopy = {
  eyebrow: 'Architectural Design · AutoCAD · Master Planning',
  headline: ['Designing Spaces.', 'Planning Communities.'],
  text: 'Architectural design, technical drafting, 3D visualization, and master planning — transforming concepts into thoughtful, functional spaces.',
};

export const aboutCopy = {
  heading: 'Architecture Through Precision and Creativity.',
  intro: [
    `${site.name} is an architectural and CAD design professional working across architectural design, AutoCAD 2D drafting, AutoCAD 3D modeling, map planning and master planning.`,
    'The work moves from first concept to coordinated technical drawings and clear visual presentation — so an idea can be understood, reviewed and built.',
  ],
  /** EDITABLE: rewrite in the client's own words. */
  philosophy:
    'Good design starts with how a space is used. Each project is approached through careful planning, accurate documentation and a clear, restrained visual language.',
  capabilities: [
    'Architectural design & building layouts',
    'AutoCAD 2D technical & construction drawings',
    'AutoCAD 3D modeling & visualization',
    'Site, land-use and road-network planning',
    'Residential & commercial master planning',
  ],
  /**
   * EDITABLE PLACEHOLDERS — leave empty until verified.
   * Example: experience: [{ title: 'Role', org: 'Studio', period: '20XX – 20XX' }]
   */
  experience: [] as { title: string; org: string; period: string }[],
  qualifications: [] as { title: string; org: string; year: string }[],
};

export const contact = {
  heading: 'Have a Project in Mind?',
  text: "Let's discuss your architectural design, drafting, or planning requirements.",
  /**
   * EDITABLE PLACEHOLDERS — leave '' until verified.
   * whatsapp: digits only with country code, e.g. '923001234567'
   * linkedin: full profile URL.
   */
  email: '',
  phone: '',
  whatsapp: '',
  linkedin: '',
  location: '',
  /** Optional: a Formspree/Basin/Getform endpoint. If empty, the form opens the visitor's email app. */
  formEndpoint: '',
};

export const navLinks = [
  { label: 'About', hash: 'about' },
  { label: 'Services', hash: 'services' },
  { label: 'Projects', hash: 'projects' },
  { label: 'Showreel', hash: 'showreel' },
  { label: 'Process', hash: 'process' },
  { label: 'Skills', hash: 'skills' },
  { label: 'Contact', hash: 'contact' },
];

export const services = [
  {
    id: 'architectural-design',
    icon: 'building',
    title: 'Architectural Design',
    points: ['Residential architecture', 'Commercial architecture', 'Building layouts', 'Elevations and sections'],
  },
  {
    id: 'autocad-2d',
    icon: 'ruler',
    title: 'AutoCAD 2D Drafting',
    points: ['Floor plans', 'Technical drawings', 'Construction drawings', 'Sections and elevations'],
  },
  {
    id: 'autocad-3d',
    icon: 'box',
    title: 'AutoCAD 3D Modeling',
    points: ['3D architectural modeling', 'Building visualization', 'Exterior concepts', 'Interior concepts'],
  },
  {
    id: 'map-planning',
    icon: 'map',
    title: 'Map Planning',
    points: ['Site planning', 'Land-use planning', 'Road network layouts', 'Housing scheme layouts'],
  },
  {
    id: 'master-planning',
    icon: 'landmark',
    title: 'Master Planning',
    points: ['Residential development layouts', 'Commercial site planning', 'Urban development concepts', 'Landscape planning'],
  },
] as const;

export const processSteps = [
  { n: '01', title: 'Concept Development', text: 'Brief, site and ambitions are translated into early ideas, massing and spatial strategy.' },
  { n: '02', title: 'Planning & Research', text: 'Site analysis, regulations, access and land-use are studied to shape a workable layout.' },
  { n: '03', title: 'Technical Drafting', text: 'Plans, sections and elevations are drawn accurately in AutoCAD 2D for review and construction.' },
  { n: '04', title: '3D Modeling', text: 'The design is built in 3D to test proportion, light and relationships before it is built.' },
  { n: '05', title: 'Design Presentation', text: 'Drawings and visuals are organised into clear presentation sets for clients and stakeholders.' },
];

/**
 * Skills. `level` (0–100) is intentionally omitted: proficiency bars appear
 * only after the client supplies real values (set `level: 85`, etc.).
 */
export const skills: { name: string; icon: string; level?: number }[] = [
  { name: 'AutoCAD 2D', icon: 'ruler' },
  { name: 'AutoCAD 3D', icon: 'box' },
  { name: 'Architectural Drafting', icon: 'pen' },
  { name: '3D Modeling', icon: 'layers' },
  { name: 'Site Planning', icon: 'compass' },
  { name: 'Master Planning', icon: 'landmark' },
  { name: 'Technical Documentation', icon: 'file' },
];
