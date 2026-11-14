import {
  Box,
  Building2,
  Compass,
  FileText,
  Landmark,
  Layers,
  Map as MapIcon,
  PenTool,
  Ruler,
  type LucideIcon,
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  building: Building2,
  ruler: Ruler,
  box: Box,
  map: MapIcon,
  landmark: Landmark,
  pen: PenTool,
  layers: Layers,
  compass: Compass,
  file: FileText,
};
