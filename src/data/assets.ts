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
  /** Optional smaller version for small screens, and its pixel width (for srcset). */
  srcSmall?: string;
  smallWidth?: number;
  /** CSS object-position used when the image is cropped (e.g. '50% 20%'). */
  position?: string;
}

/** Builds a responsive srcset string when a small variant exists. */
export const srcSetOf = (i: ImageAsset) =>
  i.srcSmall ? `${i.srcSmall} ${i.smallWidth ?? 720}w, ${i.src} ${i.width}w` : undefined;

/** Helper for optimized WebP files that have a `-sm.webp` sibling. */
const webp = (base: string, alt: string, width: number, height: number, smallWidth: number, position?: string): ImageAsset => ({
  src: `${base}.webp`,
  srcSmall: `${base}-sm.webp`,
  alt,
  width,
  height,
  smallWidth,
  position,
});

const svg = (src: string, alt: string): ImageAsset => ({ src, alt, width: 1600, height: 1000 });

export const brand = {
  logoFull: { src: '/assets/brand/logo-full.png', alt: 'Hussain Ghazanfar logo — HG monogram with architecture, CAD design and map planning', width: 600, height: 392 },
  logoMark: { src: '/assets/brand/logo-mark.png', alt: 'HG monogram', width: 263, height: 295 },
  og: '/assets/brand/og-image.png',
} as const;

export const hero: ImageAsset = webp(
  '/assets/hero/hero',
  'Architectural pencil sketch of a modern house with a sloping roof, stone cladding, balconies and a central entrance, drawn as light lines on a dark background',
  1600,
  900,
  800,
  '100% 50%',
);

export const portrait: ImageAsset = {
  src: '/assets/about/portrait.webp',
  srcSmall: '/assets/about/portrait-720.webp',
  alt: 'Portrait of Hussain Ghazanfar in a black suit against a dark blue background',
  width: 1448,
  height: 1086,
  smallWidth: 720,
};

/** Placeholder project imagery — keys are referenced from projects.ts. */
export const img = {
  // --- Supplied reference images (optimized WebP) -------------------------
  modernResidence: webp('/assets/architecture/modern-residence', 'Modern white two-storey residence with large glazing, black door, landscaped front garden and paved forecourt', 720, 1280, 640, '50% 55%'),
  urbanModel: webp('/assets/master-planning/urban-model', 'White architectural urban model with orange highlighted buildings, routes and pedestrian figures', 1200, 800, 800),
  constructionCollage: webp('/assets/autocad-3d/construction-collage', 'Layered architectural illustration of a high-rise under construction with scaffolding, cranes and technical line drawings', 736, 736, 640),
  floorPlan3d: webp('/assets/autocad-3d/floor-plan-3d', 'Furnished 3D floor plan from above showing bedrooms, bathrooms, kitchen, drawing room, stair hall and porch with warm lighting', 736, 1308, 640, '50% 30%'),
  floorPlanDark: webp('/assets/autocad-2d/floor-plan-dark', 'Dark-style architectural floor plan with bedrooms, toilets, kitchen, foyer, dining, living area and sit-out', 923, 1579, 640, '50% 20%'),
  floorPlanReference: webp('/assets/autocad-2d/floor-plan-reference', 'Black and white ground floor plan with dimensions, two rooms, open kitchen, dining, parlour and title block', 896, 1195, 640, '50% 25%'),
  // --- Generated placeholder drawings (SVG) -------------------------------
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
