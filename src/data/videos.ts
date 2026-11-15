/**
 * SHOWREEL VIDEOS — replace the files in /public/assets/video/ and edit here.
 * Both current clips are SAMPLE content supplied as references. Confirm you own them
 * or have permission to publish them. The AutoCAD clip shows an on-screen
 * "YouTube: adamdereli" credit — replace it with your own screen recording before launch.
 */
export interface VideoItem {
  id: string;
  title: string;
  label: string;
  description: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  sample: boolean;
}

export const videos: VideoItem[] = [
  {
    id: 'visualization-reel',
    title: 'Architectural Visualization Reel',
    label: '3D · Exterior · Interior',
    description: 'Interior concepts, exterior visualization and construction-stage illustration in one short reel.',
    src: '/assets/video/visualization-reel.mp4',
    poster: '/assets/video/visualization-reel-poster.webp',
    width: 576,
    height: 1024,
    sample: true,
  },
  {
    id: 'autocad-process',
    title: 'AutoCAD 2D Drafting Process',
    label: 'AutoCAD · Floor Plan',
    description: 'A floor plan taking shape in AutoCAD: walls, openings, furniture and fittings placed step by step.',
    src: '/assets/video/autocad-process.mp4',
    poster: '/assets/video/autocad-process-poster.webp',
    width: 720,
    height: 1260,
    sample: true,
  },
];
