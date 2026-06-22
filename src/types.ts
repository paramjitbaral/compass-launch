export interface Waypoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export type ActiveToolType = 
  | 'ar-navigation'
  | 'true-north'
  | 'solar-path'
  | 'waypoint'
  | 'target-lock'
  | 'kinetic'
  | 'specs'
  | 'download'
  | null;
