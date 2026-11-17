/**
 * PROJECT DATA — central file for every project.
 *
 * Entries with `placeholder: true` are SAMPLES; the others use the owner's real images. They are not client work and never
 * claim real names, locations or clients. Placeholder pages are set to `noindex` and left out
 * of sitemap.xml automatically. To publish a real project: replace the text and images,
 * set `placeholder: false`, and it becomes indexable on the next build.
 */
import { img, walkthroughVideo, type ImageAsset } from './assets';

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
  /** Optional walkthrough video (muted-friendly, loads only on play). */
  video?: { src: string; width: number; height: number; poster: ImageAsset; caption: string };
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
    slug: 'commercial-shopfront-design',
    title: 'Commercial Shopfront Design',
    category: 'architecture',
    summary: 'A two-storey commercial building with four ground-floor shops, glazed shopfronts, timber-clad columns and a first-floor balcony.',
    overview:
      'A design sheet for a two-storey commercial building on a 60 ft by 30 ft footprint. It pairs the street-level render with ground and first floor plans, and close views of the entrance, balcony and side elevation.',
    objectives: [],
    details: [
      { label: 'Type', value: 'Commercial architecture' },
      { label: 'Plan size', value: "60' × 30'" },
      { label: 'Ground floor', value: "Four shops, each 14' × 26'" },
    ],
    placeholder: false,
    images: {
      main: img.commercialSheet,
      plans2d: [{ image: img.commercialSheet, caption: 'Ground and first floor plans, with exterior render and detail views' }],
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
    slug: 'residential-drawing-set',
    title: 'Residential Drawing Set',
    category: 'autocad-2d',
    summary: 'Front elevation, section A-A and ground and first floor plans of a two-storey house, fully dimensioned.',
    overview:
      'A single drawing sheet that coordinates the front elevation, the building section, and the ground and first floor plans of a two-storey residence, with dimensions, door and window tags, and room labels.',
    objectives: [],
    details: [
      { label: 'Type', value: 'AutoCAD 2D drafting' },
      { label: 'Sheet contents', value: 'Front elevation, section A-A, ground and first floor plans' },
    ],
    placeholder: false,
    images: {
      main: img.residentialSheet,
      technicalDrawings: [{ image: img.residentialSheet, caption: 'Front elevation, section A-A and floor plans' }],
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
    slug: 'concept-sketch-form-development',
    title: 'Concept Sketch: Form Development',
    category: 'visualization',
    summary: 'A hand-rendered sketch that grows a simple box into a two-storey house in five steps, finished with a coloured perspective.',
    overview:
      'A concept sketch that shows how a design develops: a plain volume is cut, offset and stacked step by step, then drawn as a rendered perspective with a cantilevered upper floor, timber doors and a landscaped forecourt.',
    objectives: [],
    details: [
      { label: 'Type', value: 'Concept sketch' },
      { label: 'Process', value: 'Five-step massing development, then perspective' },
    ],
    placeholder: false,
    images: {
      main: img.massingSketch,
      gallery: [
        { image: img.sketch, caption: 'Chalk-style concept sketch of a modern house' },
        { image: img.render, caption: 'Rendered visualization of the house at sunset' },
      ],
    },
  },
  {
    slug: 'home-3d-walkthrough',
    title: '3D Home Walkthrough',
    category: 'visualization',
    summary: 'An aerial 3D walkthrough of a furnished narrow-plot house: living, dining, bedrooms, bathroom, wardrobe and garage.',
    overview:
      'A furnished 3D model of a narrow-plot house, presented as a moving aerial walkthrough. The camera travels through the garage, entry, living and dining spaces, bedroom, wardrobe and bathroom so the layout can be understood room by room.',
    objectives: [],
    details: [
      { label: 'Type', value: '3D interior visualization' },
      { label: 'Format', value: 'Video walkthrough, about 27 seconds' },
    ],
    placeholder: false,
    video: { ...walkthroughVideo, poster: img.walkthroughPoster, caption: 'Aerial walkthrough of the furnished 3D model' },
    images: {
      main: img.walkthroughPoster,
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
    slug: 'road-right-of-way-cross-section',
    title: 'Road Right-of-Way Cross-Section',
    category: 'map-planning',
    summary: 'A road cross-section with a 14.6 m carriageway, 2.0 m median, 2.5 m shoulders and cut and fill slopes, plus an urban, rural and highway dimension table.',
    overview:
      'A cross-section of a divided road corridor annotated with carriageway, median, shoulders, side slopes and right of way. A dimension table compares lane width, shoulder, median and slopes for urban, rural and highway roads.',
    objectives: [],
    details: [
      { label: 'Type', value: 'Road and site planning' },
      { label: 'Carriageway', value: '14.6 m' },
      { label: 'Lanes', value: '3.65 m each' },
      { label: 'Median', value: '2.0 m' },
    ],
    placeholder: false,
    images: {
      main: img.rowSection,
      technicalDrawings: [{ image: img.rowSection, caption: 'Right-of-way cross-section and dimension table' }],
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
