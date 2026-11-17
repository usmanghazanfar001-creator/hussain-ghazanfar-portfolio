/**
 * CENTRAL ASSET CONFIGURATION
 * ---------------------------------------------------------------------------
 * Every image on the site is referenced from here. To swap a sample image for a
 * real one: put the file in /public/assets/, then change `src` (and `alt`) below.
 *
 * Raster images use `raster()`: it expects four files next to each other —
 *   <base>.avif  <base>-sm.avif  <base>.webp  <base>-sm.webp
 * Only use images you own, created yourself, or are licensed for commercial use.
 */

export interface ImageAsset {
  src: string;
  alt: string;
  /** Intrinsic size — reserves layout space and prevents layout shift. */
  width: number;
  height: number;
  /** Optional small variants for narrow screens (srcset). */
  srcSmall?: string;
  smallWidth?: number;
  avif?: string;
  avifSmall?: string;
  /** CSS object-position used when the image is cropped, e.g. '60% 50%'. */
  position?: string;
}

const raster = (base: string, alt: string, width: number, height: number, smallWidth: number, position?: string): ImageAsset => ({
  src: `${base}.webp`,
  srcSmall: `${base}-sm.webp`,
  avif: `${base}.avif`,
  avifSmall: `${base}-sm.avif`,
  alt,
  width,
  height,
  smallWidth,
  position,
});

/** Generated sample drawings are SVG (resolution independent, a few KB each). */
const svg = (name: string, alt: string): ImageAsset => ({ src: `/assets/projects/${name}.svg`, alt, width: 1600, height: 1000 });

export const brand = {
  mark: {
    src: '/assets/brand/hussnain-ghazanfar-logo-mark.png',
    alt: 'HG monogram of Hussnain Ghazanfar',
    width: 263,
    height: 295,
  },
  og: '/assets/brand/hussnain-ghazanfar-og-image.png',
} as const;

export const portrait: ImageAsset = raster(
  '/assets/about/hussnain-ghazanfar-portrait',
  'Portrait of Hussnain Ghazanfar in a black suit against a dark blue background',
  1448,
  1086,
  720,
  '50% 20%',
);

const sketch = raster(
  '/assets/hero/architectural-chalk-sketch-modern-house',
  'Chalk-style architectural sketch of a modern house with a butterfly roof, stone walls and cantilevered balconies on a black background',
  1170,
  658,
  800,
  '65% 50%',
);

const render = raster(
  '/assets/hero/modern-house-sunset-visualization',
  'Architectural visualization of a modern white house at sunset with glass balconies, warm interior lighting and a landscaped garden',
  1170,
  658,
  800,
  '70% 50%',
);

/** Hero slides in display order. The first one is the LCP image (never lazy-loaded). */
export const heroSlides = [
  { id: 'sketch', label: 'Concept sketch', image: sketch },
  { id: 'render', label: 'Visualization', image: render },
] as const;

/** Real project images supplied by the owner. */
const real = {
  commercialSheet: raster('/assets/projects/commercial-shopfront-design-sheet', 'Design sheet for a two-storey commercial building: street render, ground and first floor plans measuring 60 by 30 feet, and views of the entrance, balcony and side', 736, 1101, 480, '50% 0%'),
  residentialSheet: raster('/assets/projects/residential-elevation-section-plans-sheet', 'Drawing sheet with the front elevation, section A-A, ground floor plan and first floor plan of a two-storey house', 1200, 675, 640, '50% 50%'),
  massingSketch: raster('/assets/projects/massing-development-concept-sketch', 'Hand-rendered concept sketch showing a simple box developed in five steps into a two-storey house, with a coloured perspective below', 564, 564, 400, '50% 72%'),
  rowSection: raster('/assets/projects/road-right-of-way-cross-section', 'Road right-of-way cross-section with carriageway, median, shoulders, side slopes and a dimension table for urban, rural and highway roads', 1080, 1243, 640, '50% 12%'),
  walkthroughPoster: raster('/assets/projects/home-3d-walkthrough-poster', 'Aerial 3D model of a furnished narrow-plot house showing living room, dining area, bedrooms, bathroom and garage', 720, 1280, 480, '50% 30%'),
};

export const walkthroughVideo = {
  src: '/assets/video/home-3d-walkthrough.mp4',
  width: 720,
  height: 1280,
};

export const img = {
  ...real,
  sketch,
  render,
  commercialFacade: svg('commercial-facade-concept', 'Sample commercial tower facade with vertical fins above a glass podium'),
  interiorEvening: svg('interior-visualization-evening', 'Sample evening interior visualization with a window wall, pendant lights and a warm glow'),
  planGround: svg('floor-plan-ground-line-drawing', 'Sample black and white ground floor plan with dimensions, door swings and a title block'),
  planFirst: svg('floor-plan-first-line-drawing', 'Sample black and white first floor plan with a stair and labelled rooms'),
  planPresentation: svg('floor-plan-presentation-dark', 'Sample ground floor plan in a dark presentation style with gold furniture outlines'),
  planFurnished: svg('floor-plan-furnished-sample', 'Sample furnished first floor plan seen from above on a warm timber floor'),
  elevation: svg('elevation-front-line-drawing', 'Sample front elevation line drawing with level markers and dimensions'),
  section: svg('section-aa-line-drawing', 'Sample building section with solid wall and slab poche and a stair'),
  massing: svg('massing-model-isometric', 'Sample isometric massing model of stepped building volumes on a dark background'),
  wireframe: svg('wireframe-model-isometric', 'Sample isometric wireframe model of building volumes'),
  constructionAxon: svg('construction-stage-axonometric', 'Sample axonometric drawing of a concrete frame under construction with a tower crane'),
  urbanModel: svg('urban-massing-model-isometric', 'Sample isometric urban massing model with three highlighted gold towers'),
  sitePlan: svg('housing-scheme-site-plan', 'Sample housing scheme site plan with numbered plots, a central park and a boulevard'),
  roadNetwork: svg('road-network-hierarchy', 'Sample road network showing arterial, collector and local roads with junctions'),
  masterplan: svg('master-plan-mixed-use', 'Sample master plan of a mixed-use district with a ring road, green blocks, a lake and a civic core'),
  landscape: svg('landscape-open-space-plan', 'Sample landscape plan with a pond, plaza, pergola, paths and tree canopies'),
} as const;
