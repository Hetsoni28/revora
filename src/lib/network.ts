/**
 * Where Revora is present. Add a state or country here and it appears on the maps and lists.
 * Each state is shown at its capital city; coordinates are in degrees.
 * `hq` marks the state our head office is in — the HQ pin stands for it, so it gets no route of its own.
 */
export const DOMESTIC_NETWORK: { name: string; city: string; lon: number; lat: number; hq?: boolean }[] = [
  { name: 'Jammu & Kashmir', city: 'Srinagar', lon: 74.8, lat: 34.08 },
  { name: 'Himachal Pradesh', city: 'Shimla', lon: 77.17, lat: 31.1 },
  { name: 'Punjab', city: 'Chandigarh', lon: 76.78, lat: 30.73 },
  { name: 'Uttarakhand', city: 'Dehradun', lon: 78.03, lat: 30.32 },
  { name: 'Delhi', city: 'New Delhi', lon: 77.21, lat: 28.61 },
  { name: 'Uttar Pradesh', city: 'Lucknow', lon: 80.95, lat: 26.85 },
  { name: 'Rajasthan', city: 'Jaipur', lon: 75.79, lat: 26.91 },
  { name: 'Gujarat', city: 'Ahmedabad', lon: 72.5714, lat: 23.0225, hq: true },
  { name: 'Madhya Pradesh', city: 'Bhopal', lon: 77.41, lat: 23.26 },
  { name: 'Maharashtra', city: 'Mumbai', lon: 72.88, lat: 19.08 },
  { name: 'Telangana', city: 'Hyderabad', lon: 78.49, lat: 17.39 },
  { name: 'Andhra Pradesh', city: 'Amaravati', lon: 80.52, lat: 16.51 },
  { name: 'Karnataka', city: 'Bengaluru', lon: 77.59, lat: 12.97 },
  { name: 'Kerala', city: 'Thiruvananthapuram', lon: 76.94, lat: 8.52 },
];

/** Countries outside India where we are present, each shown at its capital. Add one and it gets a pin and route on the world map. */
export const GLOBAL_NETWORK: { name: string; city: string; region: 'Asia' | 'Africa'; lon: number; lat: number }[] = [
  // Asia
  { name: 'Nepal', city: 'Kathmandu', region: 'Asia', lon: 85.32, lat: 27.72 },
  { name: 'Bangladesh', city: 'Dhaka', region: 'Asia', lon: 90.41, lat: 23.81 },
  { name: 'Sri Lanka', city: 'Colombo', region: 'Asia', lon: 79.86, lat: 6.93 },
  { name: 'UAE', city: 'Abu Dhabi', region: 'Asia', lon: 54.37, lat: 24.45 },
  { name: 'Bahrain', city: 'Manama', region: 'Asia', lon: 50.59, lat: 26.23 },
  { name: 'Iraq', city: 'Baghdad', region: 'Asia', lon: 44.37, lat: 33.31 },
  { name: 'Yemen', city: "Sana'a", region: 'Asia', lon: 44.21, lat: 15.37 },
  { name: 'Kazakhstan', city: 'Astana', region: 'Asia', lon: 71.45, lat: 51.17 },
  { name: 'Malaysia', city: 'Kuala Lumpur', region: 'Asia', lon: 101.69, lat: 3.14 },
  { name: 'Philippines', city: 'Manila', region: 'Asia', lon: 120.98, lat: 14.6 },
  // Africa
  { name: 'Libya', city: 'Tripoli', region: 'Africa', lon: 13.19, lat: 32.89 },
  { name: 'Uganda', city: 'Kampala', region: 'Africa', lon: 32.58, lat: 0.35 },
  { name: 'Kenya', city: 'Nairobi', region: 'Africa', lon: 36.82, lat: -1.29 },
  { name: 'Tanzania', city: 'Dodoma', region: 'Africa', lon: 35.74, lat: -6.16 },
  { name: 'Congo', city: 'Kinshasa', region: 'Africa', lon: 15.31, lat: -4.32 },
  { name: 'Zimbabwe', city: 'Harare', region: 'Africa', lon: 31.05, lat: -17.83 },
  { name: 'South Africa', city: 'Pretoria', region: 'Africa', lon: 28.19, lat: -25.75 },
];

/* ── map projections (match the generated dot maps in components/maps/map-data.ts) ── */

const merc = (lat: number) => (Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) * 180) / Math.PI;

/** India map (Mercator), anchored on the Ahmedabad pin. */
const IN = { lon: 72.5714, lat: 23.0225, x: 76.4, y: 255.7, k: 15.052 };
export function toIndiaMap(lon: number, lat: number): [number, number] {
  return [IN.x + (lon - IN.lon) * IN.k, IN.y - (merc(lat) - merc(IN.lat)) * IN.k];
}

/** World map (equirectangular, 1000 wide; vertical scale fitted to the regional pins). */
export function toWorldMap(lon: number, lat: number): [number, number] {
  return [((lon + 180) / 360) * 1000, 206.1 + (23.0225 - lat) * 3.383];
}
