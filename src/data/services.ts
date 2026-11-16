/**
 * SERVICES — one entry per service page (/services/<slug>) and per row on the home page.
 * Describes what is offered; it makes no claims about licences, registrations or past clients.
 */
import type { CategoryId } from './projects';

export interface Service {
  slug: string;
  icon: string;
  title: string;
  short: string;
  intro: string[];
  points: string[];
  deliverables: string[];
  /** Project categories shown as related work on the service page. */
  categories: CategoryId[];
  seoTitle: string;
  seoDescription: string;
}

export const services: Service[] = [
  {
    slug: 'architectural-design',
    icon: 'building',
    title: 'Architectural Design',
    short: 'Residential and commercial design developed from first concept to coordinated drawings.',
    intro: [
      'Architectural design starts with how a space will be used: the people, the site, the light and the budget. From there the design is developed into clear layouts, elevations and sections that can be reviewed and built.',
      'Residential and commercial buildings are approached with the same discipline — a restrained design language, sensible circulation and documentation that is easy to follow.',
    ],
    points: ['Residential design', 'Commercial design', 'Building layouts', 'Architectural elevations', 'Sections and technical documentation'],
    deliverables: ['Concept layouts and massing studies', 'Plans, elevations and sections', 'Material and finish intent', 'Presentation sheets for client review'],
    categories: ['architecture'],
    seoTitle: 'Architectural Design Services',
    seoDescription: 'Residential and commercial architectural design by Hussnain Ghazanfar: building layouts, elevations, sections and clear technical documentation.',
  },
  {
    slug: 'autocad-2d-drafting',
    icon: 'ruler',
    title: 'AutoCAD 2D Drafting',
    short: 'Accurate floor plans, working drawings and construction drawings.',
    intro: [
      'Good drawings remove guesswork. AutoCAD 2D drafting turns a design into dimensioned, annotated and consistently organised sheets that contractors and consultants can work from.',
      'Floor plans, sections and elevations are coordinated with each other, so a change in one drawing is reflected across the set.',
    ],
    points: ['Floor plans', 'Working drawings', 'Construction drawings', 'Technical drafting'],
    deliverables: ['Dimensioned floor plans', 'Sections and elevations', 'Layer-organised DWG files', 'PDF sheets ready to print or share'],
    categories: ['autocad-2d'],
    seoTitle: 'AutoCAD 2D Drafting & Floor Plans',
    seoDescription: 'AutoCAD 2D drafting by Hussnain Ghazanfar: dimensioned architectural floor plans, working drawings and construction drawings.',
  },
  {
    slug: 'autocad-3d-modeling',
    icon: 'box',
    title: 'AutoCAD 3D Modeling & Visualization',
    short: 'Building models, exterior and interior views and clear 3D presentation.',
    intro: [
      'A 3D model lets a client see a building before it exists. Models are used to test proportion, light and relationships, then presented as clear exterior and interior views.',
      'The same model can produce section cuts and massing diagrams, keeping the 3D work consistent with the 2D drawings.',
    ],
    points: ['Building modeling', 'Exterior visualization', 'Interior visualization', '3D presentation'],
    deliverables: ['3D building model', 'Exterior and interior views', 'Massing and section views', 'Presentation images'],
    categories: ['autocad-3d', 'visualization'],
    seoTitle: 'AutoCAD 3D Modeling & Visualization',
    seoDescription: 'AutoCAD 3D building modeling and architectural visualization by Hussnain Ghazanfar: exterior and interior views and 3D presentation.',
  },
  {
    slug: 'site-and-map-planning',
    icon: 'map',
    title: 'Map and Site Planning',
    short: 'Site layouts, land-use plans, road networks and housing development planning.',
    intro: [
      'Site and map planning organises land: where plots, roads, open space and buildings go, and how they connect. A clear layout makes a development easier to approve, build and live in.',
      'Layouts are drawn to scale with plot numbering, road hierarchy and land-use areas shown clearly.',
    ],
    points: ['Site layouts', 'Land-use layouts', 'Road networks', 'Housing development planning'],
    deliverables: ['Site and plot layout plans', 'Land-use and area schedules', 'Road hierarchy drawings', 'Housing scheme layouts'],
    categories: ['map-planning'],
    seoTitle: 'Site & Map Planning Services',
    seoDescription: 'Site layouts, land-use planning, road networks and housing development layouts by Hussnain Ghazanfar.',
  },
  {
    slug: 'master-planning',
    icon: 'landmark',
    title: 'Master Planning',
    short: 'Residential and commercial master plans, urban concepts and landscape planning.',
    intro: [
      'Master planning looks at the whole development: zoning, density, movement, open space and phasing. The aim is a layout that works today and can grow.',
      'Residential schemes, commercial developments and mixed-use districts are planned with attention to public space, green areas and clear circulation.',
    ],
    points: ['Residential master plans', 'Commercial development layouts', 'Urban planning concepts', 'Landscape planning'],
    deliverables: ['Master plan drawings', 'Zoning and land-use diagrams', 'Open space and landscape concepts', 'Presentation sheets and massing views'],
    categories: ['master-planning'],
    seoTitle: 'Master Planning & Housing Layouts',
    seoDescription: 'Residential and commercial master planning by Hussnain Ghazanfar: urban concepts, development layouts and landscape planning.',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** The service page that covers a project category (used for internal links from project pages). */
export const serviceForCategory = (category: CategoryId) => services.find((s) => s.categories.includes(category));
