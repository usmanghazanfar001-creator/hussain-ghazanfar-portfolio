/**
 * PROJECT DATA — central file for every project.
 *
 * All projects below are SAMPLES (`placeholder: true`). They are not client work and never
 * claim real names, locations or clients. Placeholder pages are set to `noindex` and left out
 * of sitemap.xml automatically. To publish a real project: replace the text and images,
 * set `placeholder: false`, and it becomes indexable on the next build.
 */
import { img, type ImageAsset } from './assets';

export type CategoryId = 'architecture' | 'autocad-2d' | 'autocad-3d' | 'visualization' | 'map-planning' | 'master-planning';

export const categories: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'architecture', label: 'Architectural Design' },
  { id: 'autocad-2d', label: 'AutoCAD 2D Drawings' },
  { id: 'autocad-3d', label: 'AutoCAD 3D Modeling' },
  { id: 'visualization', label: 'Architectural Visualization' },
  { id: 'map-planning', label: 'Site and Map Planning' },
  { id: 'master-planning', label: 'Master Planning' },
];

export const categoryLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? id;

type Captioned = { image: ImageAsset; caption: string };

export interface Project {
  slug: string;
  title: string;
  category: CategoryId;
  summary: string;
  overview: string;
  objectives: string[];
  /** "To be provided" is shown for values that are not verified yet. */
  details: { label: string; value: string }[];
  placeholder: boolean;
  images: {
    main: ImageAsset;
    technicalDrawings?: Captioned[];
    plans2d?: Captioned[];
    visualizations3d?: Captioned[];
    gallery?: Captioned[];
  };
}

export const TBP = 'To be provided';
const baseDetails = (type: string) => [
  { label: 'Type', value: type },
  { label: 'Location', value: TBP },
  { label: 'Year', value: TBP },
  { label: 'Role', value: TBP },
];
const sampleOverview = (what: string) =>
  `This is a sample entry that shows how a ${what} project is presented. Replace this paragraph with the real brief, site context and design approach once the project is confirmed.`;

export const projects: Project[] = [
  {
    slug: 'residential-concept',
    title: 'Residential Concept',
    category: 'architecture',
    summary: 'Sample: a contemporary two-storey residence with glass balconies, warm interiors and a landscaped forecourt.',
    overview: sampleOverview('residential architecture'),
    objectives: ['Describe the client brief and spatial programme', 'Explain how the plan responds to site, light and privacy', 'Note materials and construction approach'],
    details: baseDetails('Residential architecture'),
    placeholder: true,
    images: {
      main: img.render,
      technicalDrawings: [{ image: img.elevation, caption: 'Front elevation (sample)' }, { image: img.section, caption: 'Section A-A (sample)' }],
      plans2d: [{ image: img.planPresentation, caption: 'Ground floor plan, presentation style (sample)' }, { image: img.planFirst, caption: 'First floor plan (sample)' }],
      visualizations3d: [{ image: img.planFurnished, caption: 'Furnished plan (sample)' }, { image: img.interiorEvening, caption: 'Interior visualization (sample)' }],
      gallery: [{ image: img.render, caption: 'Exterior at sunset (sample)' }],
    },
  },
  {
    slug: 'commercial-facade-study',
    title: 'Commercial Facade Study',
    category: 'architecture',
    summary: 'Sample: a minimalist commercial tower with vertical fins over a glazed podium.',
    overview: sampleOverview('commercial architecture'),
    objectives: ['Define the commercial programme and floor efficiency', 'Explain the facade strategy and solar control', 'Describe street-level interaction'],
    details: baseDetails('Commercial architecture'),
    placeholder: true,
    images: {
      main: img.commercialFacade,
      technicalDrawings: [{ image: img.elevation, caption: 'Facade elevation (sample)' }],
      visualizations3d: [{ image: img.massing, caption: 'Massing study (sample)' }],
      gallery: [{ image: img.commercialFacade, caption: 'Street view (sample)' }],
    },
  },
  {
    slug: 'floor-plan-set',
    title: 'Floor Plan Set',
    category: 'autocad-2d',
    summary: 'Sample: black-and-white AutoCAD-style floor plans with dimensions, grid lines and a title block.',
    overview: sampleOverview('2D drafting'),
    objectives: ['State the drawing standards and layer conventions', 'List the sheets in the set', 'Explain coordination between plans, sections and elevations'],
    details: baseDetails('AutoCAD 2D drafting'),
    placeholder: true,
    images: {
      main: img.planGround,
      plans2d: [{ image: img.planGround, caption: 'Ground floor plan (sample)' }, { image: img.planFirst, caption: 'First floor plan (sample)' }, { image: img.planPresentation, caption: 'Presentation plan (sample)' }],
      technicalDrawings: [{ image: img.section, caption: 'Section A-A (sample)' }],
    },
  },
  {
    slug: 'elevation-section-package',
    title: 'Elevation & Section Package',
    category: 'autocad-2d',
    summary: 'Sample: technical elevations and sections with level markers and dimensions.',
    overview: sampleOverview('technical drawing'),
    objectives: ['Describe the level of detail required', 'Explain annotation and dimensioning approach', 'Note issue and revision control'],
    details: baseDetails('AutoCAD 2D drafting'),
    placeholder: true,
    images: {
      main: img.elevation,
      technicalDrawings: [{ image: img.elevation, caption: 'Front elevation (sample)' }, { image: img.section, caption: 'Section A-A (sample)' }],
      plans2d: [{ image: img.planFirst, caption: 'Reference plan (sample)' }],
    },
  },
  {
    slug: 'massing-model-study',
    title: 'Massing Model Study',
    category: 'autocad-3d',
    summary: 'Sample: an isometric 3D massing model of stepped volumes, with a wireframe view.',
    overview: sampleOverview('3D modeling'),
    objectives: ['Explain the volumetric strategy', 'Show how the model informed plan decisions', 'Describe the modeling workflow'],
    details: baseDetails('AutoCAD 3D modeling'),
    placeholder: true,
    images: {
      main: img.massing,
      visualizations3d: [{ image: img.massing, caption: 'Massing model (sample)' }, { image: img.wireframe, caption: 'Wireframe view (sample)' }],
    },
  },
  {
    slug: 'construction-stage-axonometric',
    title: 'Construction-Stage Axonometric',
    category: 'autocad-3d',
    summary: 'Sample: an axonometric of a concrete frame under construction, showing columns, slabs and a crane.',
    overview: sampleOverview('construction-stage 3D'),
    objectives: ['Describe the structural system and phasing', 'Explain how drawings and 3D views are coordinated', 'Show the presentation approach'],
    details: baseDetails('3D modeling'),
    placeholder: true,
    images: {
      main: img.constructionAxon,
      visualizations3d: [{ image: img.constructionAxon, caption: 'Structure under construction (sample)' }, { image: img.wireframe, caption: 'Wireframe view (sample)' }],
    },
  },
  {
    slug: 'furnished-plan-presentation',
    title: 'Furnished Plan Presentation',
    category: 'visualization',
    summary: 'Sample: a furnished plan seen from above with warm lighting, timber floors and room labels.',
    overview: sampleOverview('plan presentation'),
    objectives: ['Describe the plot size and room programme', 'Explain furniture layout and circulation', 'Show how plans are presented to clients'],
    details: baseDetails('Plan presentation'),
    placeholder: true,
    images: {
      main: img.planFurnished,
      plans2d: [{ image: img.planPresentation, caption: 'Companion 2D plan (sample)' }],
      visualizations3d: [{ image: img.planFurnished, caption: 'Furnished plan (sample)' }],
    },
  },
  {
    slug: 'chalk-sketch-concept',
    title: 'Chalk Sketch Concept',
    category: 'visualization',
    summary: 'Sample: a chalk-style concept sketch of a modern house with a butterfly roof and stone walls.',
    overview: sampleOverview('concept sketch'),
    objectives: ['Describe the design idea behind the sketch', 'Explain how the sketch develops into plans and 3D views', 'Note the drawing medium and process'],
    details: baseDetails('Concept sketch'),
    placeholder: true,
    images: {
      main: img.sketch,
      visualizations3d: [{ image: img.sketch, caption: 'Concept sketch (sample)' }, { image: img.render, caption: 'Rendered visualization (sample)' }],
    },
  },
  {
    slug: 'interior-visualization',
    title: 'Interior Visualization',
    category: 'visualization',
    summary: 'Sample: an atmospheric evening interior concept with a warm window glow.',
    overview: sampleOverview('interior visualization'),
    objectives: ['Describe the interior concept and material palette', 'Explain lighting intent', 'Show the relationship to the architectural plan'],
    details: baseDetails('Interior visualization'),
    placeholder: true,
    images: {
      main: img.interiorEvening,
      visualizations3d: [{ image: img.interiorEvening, caption: 'Evening view (sample)' }],
      plans2d: [{ image: img.planFurnished, caption: 'Reference plan (sample)' }],
    },
  },
  {
    slug: 'housing-scheme-layout',
    title: 'Housing Scheme Layout',
    category: 'map-planning',
    summary: 'Sample: a plotted housing scheme with a central park, boulevard and commercial frontage.',
    overview: sampleOverview('housing scheme planning'),
    objectives: ['State the site area, plot mix and land-use split', 'Explain the road hierarchy and access', 'Describe open-space provision'],
    details: baseDetails('Site and map planning'),
    placeholder: true,
    images: {
      main: img.sitePlan,
      plans2d: [{ image: img.sitePlan, caption: 'Site plan (sample)' }],
      technicalDrawings: [{ image: img.roadNetwork, caption: 'Road network (sample)' }],
    },
  },
  {
    slug: 'road-network-study',
    title: 'Road Network Study',
    category: 'map-planning',
    summary: 'Sample: an arterial, collector and local road hierarchy with junction nodes.',
    overview: sampleOverview('road network planning'),
    objectives: ['Describe the movement hierarchy', 'Explain junction and roundabout strategy', 'Note connections to the wider network'],
    details: baseDetails('Road network layout'),
    placeholder: true,
    images: {
      main: img.roadNetwork,
      plans2d: [{ image: img.roadNetwork, caption: 'Network layout (sample)' }],
      gallery: [{ image: img.sitePlan, caption: 'Related site plan (sample)' }],
    },
  },
  {
    slug: 'mixed-use-master-plan',
    title: 'Mixed-Use Master Plan',
    category: 'master-planning',
    summary: 'Sample: a district master plan with a ring road, green blocks, a lake and a civic core.',
    overview: sampleOverview('master planning'),
    objectives: ['Define the development vision and phasing', 'Explain land-use zoning and density', 'Describe open space and public realm strategy'],
    details: baseDetails('Master planning'),
    placeholder: true,
    images: {
      main: img.masterplan,
      plans2d: [{ image: img.masterplan, caption: 'Master plan (sample)' }],
      gallery: [{ image: img.landscape, caption: 'Landscape strategy (sample)' }],
    },
  },
  {
    slug: 'urban-massing-model',
    title: 'Urban Massing Model',
    category: 'master-planning',
    summary: 'Sample: an isometric urban model with a dense core and three highlighted landmark towers.',
    overview: sampleOverview('urban design'),
    objectives: ['Explain the urban strategy and key buildings', 'Describe pedestrian and vehicle routes', 'Show how the model supports stakeholder discussion'],
    details: baseDetails('Urban master planning'),
    placeholder: true,
    images: {
      main: img.urbanModel,
      visualizations3d: [{ image: img.urbanModel, caption: 'Urban massing model (sample)' }],
      plans2d: [{ image: img.masterplan, caption: 'Master plan (sample)' }],
    },
  },
  {
    slug: 'landscape-open-space-plan',
    title: 'Landscape & Open Space Plan',
    category: 'master-planning',
    summary: 'Sample: a landscape plan with a plaza, pergola, pond, paths and tree canopy.',
    overview: sampleOverview('landscape planning'),
    objectives: ['Describe the public realm concept', 'Explain planting and shade strategy', 'Note circulation and gathering spaces'],
    details: baseDetails('Landscape planning'),
    placeholder: true,
    images: {
      main: img.landscape,
      plans2d: [{ image: img.landscape, caption: 'Landscape plan (sample)' }],
      gallery: [{ image: img.masterplan, caption: 'Context master plan (sample)' }],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
