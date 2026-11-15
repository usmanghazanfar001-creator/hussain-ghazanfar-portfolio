/**
 * PROJECT DATA — central file for every project.
 *
 * All projects below are CLEARLY LABELLED PLACEHOLDERS (`placeholder: true`).
 * They are not real client work. To publish a real project: replace the text,
 * point `images` at real files in assets.ts, and set `placeholder: false`
 * (the "Placeholder" badge disappears automatically).
 */
import { img, type ImageAsset } from './assets';

export type CategoryId = 'architecture' | 'autocad-2d' | 'autocad-3d' | 'map-planning' | 'master-planning';

export const categories: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'autocad-2d', label: 'AutoCAD 2D' },
  { id: 'autocad-3d', label: 'AutoCAD 3D' },
  { id: 'map-planning', label: 'Map Planning' },
  { id: 'master-planning', label: 'Master Planning' },
];

export const categoryLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? id;

export interface Project {
  slug: string;
  title: string;
  category: CategoryId;
  summary: string;
  overview: string;
  objectives: string[];
  /** Shown on the project page. Fill in verified facts; "To be provided" is shown for empty values. */
  details: { label: string; value: string }[];
  placeholder: boolean;
  images: {
    main: ImageAsset;
    technicalDrawings?: { image: ImageAsset; caption: string }[];
    plans2d?: { image: ImageAsset; caption: string }[];
    visualizations3d?: { image: ImageAsset; caption: string }[];
    gallery?: { image: ImageAsset; caption: string }[];
  };
}

const TBP = 'To be provided';
const baseDetails = (type: string) => [
  { label: 'Type', value: type },
  { label: 'Location', value: TBP },
  { label: 'Year', value: TBP },
  { label: 'Role', value: TBP },
];
const placeholderOverview = (what: string) =>
  `This is a placeholder entry showing how a ${what} project will be presented. Replace this paragraph with the real project brief, site context and design approach.`;

export const projects: Project[] = [
  {
    slug: 'residence-concept',
    title: 'Residential Concept',
    category: 'architecture',
    summary: 'Placeholder: a contemporary residence with a cantilevered upper volume and generous glazing.',
    overview: placeholderOverview('residential architecture'),
    objectives: ['Describe the client brief and spatial programme', 'Explain how the plan responds to site, light and privacy', 'Note materials and construction approach'],
    details: baseDetails('Residential architecture'),
    placeholder: true,
    images: {
      main: img.modernResidence,
      technicalDrawings: [{ image: img.elevation, caption: 'Front elevation (placeholder)' }, { image: img.section, caption: 'Section A-A (placeholder)' }],
      plans2d: [{ image: img.floorPlanDark, caption: 'Floor plan (sample)' }, { image: img.planFirst, caption: 'First floor plan (placeholder)' }],
      visualizations3d: [{ image: img.floorPlan3d, caption: 'Furnished 3D plan (sample)' }, { image: img.interiorLight, caption: 'Interior visualization (placeholder)' }],
      gallery: [{ image: img.modernResidence, caption: 'Exterior view (sample)' }, { image: img.residenceExterior, caption: 'Exterior concept (placeholder)' }],
    },
  },
  {
    slug: 'commercial-facade-study',
    title: 'Commercial Facade Study',
    category: 'architecture',
    summary: 'Placeholder: a minimalist commercial tower with vertical fins over a glazed podium.',
    overview: placeholderOverview('commercial architecture'),
    objectives: ['Define the commercial programme and floor efficiency', 'Explain the facade strategy and solar control', 'Describe street-level interaction'],
    details: baseDetails('Commercial architecture'),
    placeholder: true,
    images: {
      main: img.commercialFacade,
      technicalDrawings: [{ image: img.elevation, caption: 'Facade elevation (placeholder)' }],
      visualizations3d: [{ image: img.isoLight, caption: 'Massing study (placeholder)' }],
      gallery: [{ image: img.commercialFacade, caption: 'Street view (placeholder)' }],
    },
  },
  {
    slug: 'floor-plan-set',
    title: 'Floor Plan Set',
    category: 'autocad-2d',
    summary: 'Placeholder: black-and-white AutoCAD floor plans with dimensions, grid and title block.',
    overview: placeholderOverview('2D drafting'),
    objectives: ['State the drawing standards and layer conventions', 'List the sheets in the set', 'Explain coordination between plans, sections and elevations'],
    details: baseDetails('AutoCAD 2D drafting'),
    placeholder: true,
    images: {
      main: img.floorPlanReference,
      plans2d: [{ image: img.floorPlanReference, caption: 'Ground floor plan with dimensions (sample)' }, { image: img.floorPlanDark, caption: 'Presentation floor plan (sample)' }, { image: img.planGround, caption: 'Ground floor plan (placeholder)' }, { image: img.planFirst, caption: 'First floor plan (placeholder)' }],
      technicalDrawings: [{ image: img.section, caption: 'Section A-A (placeholder)' }],
    },
  },
  {
    slug: 'elevation-section-package',
    title: 'Elevation & Section Package',
    category: 'autocad-2d',
    summary: 'Placeholder: technical elevations and sections with level markers and dimensions.',
    overview: placeholderOverview('technical drawing'),
    objectives: ['Describe the level of detail required', 'Explain annotation and dimensioning approach', 'Note issue and revision control'],
    details: baseDetails('AutoCAD 2D drafting'),
    placeholder: true,
    images: {
      main: img.elevation,
      technicalDrawings: [{ image: img.elevation, caption: 'Front elevation (placeholder)' }, { image: img.section, caption: 'Section A-A (placeholder)' }],
      plans2d: [{ image: img.planFirst, caption: 'Reference plan (placeholder)' }],
    },
  },
  {
    slug: 'massing-model-study',
    title: 'Massing Model Study',
    category: 'autocad-3d',
    summary: 'Placeholder: an isometric 3D massing model of stepped volumes, with a wireframe view.',
    overview: placeholderOverview('3D modeling'),
    objectives: ['Explain the volumetric strategy', 'Show how the model informed plan decisions', 'Describe the visualization workflow'],
    details: baseDetails('AutoCAD 3D modeling'),
    placeholder: true,
    images: {
      main: img.massing,
      visualizations3d: [{ image: img.massing, caption: 'Massing model (placeholder)' }, { image: img.wireframe, caption: 'Wireframe view (placeholder)' }, { image: img.isoLight, caption: 'Light model view (placeholder)' }],
      gallery: [{ image: img.isoLight, caption: 'Model view (placeholder)' }],
    },
  },
  {
    slug: 'interior-visualization',
    title: 'Interior Visualization',
    category: 'autocad-3d',
    summary: 'Placeholder: an atmospheric interior concept with a warm window glow.',
    overview: placeholderOverview('interior visualization'),
    objectives: ['Describe the interior concept and material palette', 'Explain lighting intent', 'Show the relationship to the architectural plan'],
    details: baseDetails('Interior visualization'),
    placeholder: true,
    images: {
      main: img.interiorDark,
      visualizations3d: [{ image: img.interiorDark, caption: 'Evening view (placeholder)' }, { image: img.interiorLight, caption: 'Daylight view (placeholder)' }],
      plans2d: [{ image: img.planGround, caption: 'Reference plan (placeholder)' }],
    },
  },
  {
    slug: 'housing-scheme-layout',
    title: 'Housing Scheme Layout',
    category: 'map-planning',
    summary: 'Placeholder: a plotted housing scheme with a central park, boulevard and commercial frontage.',
    overview: placeholderOverview('housing scheme planning'),
    objectives: ['State the site area, plot mix and land-use split', 'Explain the road hierarchy and access', 'Describe open-space provision'],
    details: baseDetails('Map / site planning'),
    placeholder: true,
    images: {
      main: img.sitePlan,
      plans2d: [{ image: img.sitePlan, caption: 'Site plan (placeholder)' }],
      technicalDrawings: [{ image: img.roadNetwork, caption: 'Road network (placeholder)' }],
    },
  },
  {
    slug: 'road-network-study',
    title: 'Road Network Study',
    category: 'map-planning',
    summary: 'Placeholder: an arterial, collector and local road hierarchy with junction nodes.',
    overview: placeholderOverview('road network planning'),
    objectives: ['Describe the movement hierarchy', 'Explain junction and roundabout strategy', 'Note connections to the wider network'],
    details: baseDetails('Road network layout'),
    placeholder: true,
    images: {
      main: img.roadNetwork,
      plans2d: [{ image: img.roadNetwork, caption: 'Network layout (placeholder)' }],
      gallery: [{ image: img.sitePlan, caption: 'Related site plan (placeholder)' }],
    },
  },
  {
    slug: 'mixed-use-master-plan',
    title: 'Mixed-Use Master Plan',
    category: 'master-planning',
    summary: 'Placeholder: a district master plan with a ring road, green blocks, lake and civic core.',
    overview: placeholderOverview('master planning'),
    objectives: ['Define the development vision and phasing', 'Explain land-use zoning and density', 'Describe open space and public realm strategy'],
    details: baseDetails('Master planning'),
    placeholder: true,
    images: {
      main: img.masterplan,
      plans2d: [{ image: img.masterplan, caption: 'Master plan (placeholder)' }],
      visualizations3d: [{ image: img.urbanModel, caption: 'Physical massing model (sample)' }],
      gallery: [{ image: img.landscape, caption: 'Landscape strategy (placeholder)' }],
    },
  },
  {
    slug: 'landscape-open-space-plan',
    title: 'Landscape & Open Space Plan',
    category: 'master-planning',
    summary: 'Placeholder: a landscape plan with a plaza, pergola, pond, paths and tree canopy.',
    overview: placeholderOverview('landscape planning'),
    objectives: ['Describe the public realm concept', 'Explain planting and shade strategy', 'Note circulation and gathering spaces'],
    details: baseDetails('Landscape planning'),
    placeholder: true,
    images: {
      main: img.landscape,
      plans2d: [{ image: img.landscape, caption: 'Landscape plan (placeholder)' }],
      gallery: [{ image: img.masterplan, caption: 'Context master plan (placeholder)' }],
    },
  },
  {
    slug: 'furnished-3d-floor-plan',
    title: 'Furnished 3D Floor Plan',
    category: 'autocad-3d',
    summary: 'Sample: a top-down furnished plan with warm lighting, room labels and landscaped lawns.',
    overview: placeholderOverview('3D plan presentation'),
    objectives: ['Describe the plot size and room programme', 'Explain furniture layout and circulation', 'Show how the plan is presented to clients'],
    details: baseDetails('3D plan presentation'),
    placeholder: true,
    images: {
      main: img.floorPlan3d,
      plans2d: [{ image: img.floorPlanDark, caption: 'Companion 2D plan (sample)' }],
      visualizations3d: [{ image: img.floorPlan3d, caption: 'Furnished plan (sample)' }],
    },
  },
  {
    slug: 'urban-massing-model',
    title: 'Urban Massing Model',
    category: 'master-planning',
    summary: 'Sample: a physical-style urban model with highlighted buildings, routes and pedestrian flow.',
    overview: placeholderOverview('urban design'),
    objectives: ['Explain the urban strategy and key buildings', 'Describe pedestrian and vehicle routes', 'Show how the model supports stakeholder discussion'],
    details: baseDetails('Urban master planning'),
    placeholder: true,
    images: {
      main: img.urbanModel,
      visualizations3d: [{ image: img.urbanModel, caption: 'Massing model (sample)' }],
      plans2d: [{ image: img.masterplan, caption: 'Master plan (placeholder)' }],
    },
  },
  {
    slug: 'construction-visualization',
    title: 'Construction Visualization',
    category: 'autocad-3d',
    summary: 'Sample: a layered illustration combining structure, scaffolding and technical linework.',
    overview: placeholderOverview('construction visualization'),
    objectives: ['Describe the structural system and phasing', 'Explain how drawings and 3D views are coordinated', 'Show the presentation approach'],
    details: baseDetails('3D visualization'),
    placeholder: true,
    images: {
      main: img.constructionCollage,
      visualizations3d: [{ image: img.constructionCollage, caption: 'Construction illustration (sample)' }, { image: img.wireframe, caption: 'Wireframe view (placeholder)' }],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
