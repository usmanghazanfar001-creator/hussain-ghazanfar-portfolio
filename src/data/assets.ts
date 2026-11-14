/**
 * CENTRAL ASSET CONFIGURATION
 * ---------------------------------------------------------------------------
 * Every image on the site is referenced from here. To swap a placeholder for a
 * real image: drop the file into /public/assets/<folder>/ and change `src`
 * (and `alt`) below. Nothing else needs to change.
 *
 * Only use images you own or that are licensed / public domain / explicitly
 * permitted for commercial reuse. Never hot-link Pinterest pages.
 */

export interface ImageAsset {
  src: string;
  alt: string;
  /** Intrinsic size, used to reserve layout space (prevents layout shift). */
  width: number;
  height: number;
  /** Optional smaller version for small screens. */
  srcSmall?: string;
}

const svg = (src: string, alt: string): ImageAsset => ({ src, alt, width: 1600, height: 1000 });

export const brand = {
  logoFull: { src: '/assets/brand/logo-full.png', alt: 'Hussain Ghazanfar logo — HG monogram with architecture, CAD design and map planning', width: 600, height: 392 },
  logoMark: { src: '/assets/brand/logo-mark.png', alt: 'HG monogram', width: 263, height: 295 },
  og: '/assets/brand/og-image.png',
} as const;

export const hero: ImageAsset = svg(
  '/assets/hero/hero-placeholder.svg',
  'Placeholder visualization of a modern building at dusk with a lit glass volume and cantilevered roof slab',
);

export const portrait: ImageAsset = {
  src: '/assets/about/portrait.webp',
  srcSmall: '/assets/about/portrait-720.webp',
  alt: 'Portrait of Hussain Ghazanfar in a black suit against a dark blue background',
  width: 1448,
  height: 1086,
};

/** Placeholder project imagery — keys are referenced from projects.ts. */
export const img = {
  residenceExterior: svg('/assets/architecture/residence-exterior.svg', 'Placeholder residential exterior with cantilevered upper volume and large glazing'),
  commercialFacade: svg('/assets/architecture/commercial-facade.svg', 'Placeholder commercial tower facade with vertical fins and glass podium'),
  interiorLight: svg('/assets/architecture/interior-light.svg', 'Placeholder light interior living space with window wall and pendant lights'),

  planGround: svg('/assets/autocad-2d/plan-ground.svg', 'Placeholder black and white ground floor plan with dimensions and title block'),
  planFirst: svg('/assets/autocad-2d/plan-first.svg', 'Placeholder black and white first floor plan with stair and room labels'),
  elevation: svg('/assets/autocad-2d/elevation.svg', 'Placeholder front elevation line drawing with level markers'),
  section: svg('/assets/autocad-2d/section.svg', 'Placeholder building section with solid wall and slab poché and stair'),

  massing: svg('/assets/autocad-3d/massing-iso.svg', 'Placeholder isometric massing model of stepped building volumes on a dark background'),
  wireframe: svg('/assets/autocad-3d/wireframe.svg', 'Placeholder isometric wireframe model of building volumes'),
  isoLight: svg('/assets/autocad-3d/exterior-render.svg', 'Placeholder light isometric building model with a warm accent volume'),
  interiorDark: svg('/assets/autocad-3d/interior-dark.svg', 'Placeholder moody interior visualization with warm window glow'),

  sitePlan: svg('/assets/map-planning/site-plan.svg', 'Placeholder housing scheme site plan with numbered plots, park and boulevard'),
  roadNetwork: svg('/assets/map-planning/road-network.svg', 'Placeholder road network layout showing arterial, collector and local roads'),

  masterplan: svg('/assets/master-planning/masterplan.svg', 'Placeholder master plan of a mixed-use district with ring road, green blocks and civic core'),
  landscape: svg('/assets/master-planning/landscape.svg', 'Placeholder landscape plan with pond, plaza, pergola, paths and tree canopies'),
} as const;

export type ImageKey = keyof typeof img;
