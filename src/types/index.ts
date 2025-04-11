
export type PointOfInterestType = {
  id: string;
  name: string;
  description?: string;
  x: number;
  y: number;
  icon: string;
};

export type IconOption = {
  id: string;
  name: string;
  src: string;
};

// Extend the Window interface to support our modal methods
declare global {
  interface Window {
    [key: string]: any;
  }
}
