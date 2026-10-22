/**
 * Where Revora is present. Add a state or country here and it appears on the maps and lists.
 * Each state is shown at its capital city; coordinates are in degrees.
 */
export const DOMESTIC_NETWORK: { name: string; city: string; lon: number; lat: number }[] = [
  { name: 'Jammu & Kashmir', city: 'Srinagar', lon: 74.8, lat: 34.08 },
  { name: 'Himachal Pradesh', city: 'Shimla', lon: 77.17, lat: 31.1 },
  { name: 'Punjab', city: 'Chandigarh', lon: 76.78, lat: 30.73 },
  { name: 'Uttarakhand', city: 'Dehradun', lon: 78.03, lat: 30.32 },
  { name: 'Delhi', city: 'New Delhi', lon: 77.21, lat: 28.61 },
  { name: 'Uttar Pradesh', city: 'Lucknow', lon: 80.95, lat: 26.85 },
  { name: 'Rajasthan', city: 'Jaipur', lon: 75.79, lat: 26.91 },
  { name: 'Madhya Pradesh', city: 'Bhopal', lon: 77.41, lat: 23.26 },
  { name: 'Maharashtra', city: 'Mumbai', lon: 72.88, lat: 19.08 },
  { name: 'Telangana', city: 'Hyderabad', lon: 78.49, lat: 17.39 },
  { name: 'Andhra Pradesh', city: 'Amaravati', lon: 80.52, lat: 16.51 },
  { name: 'Karnataka', city: 'Bengaluru', lon: 77.59, lat: 12.97 },
  { name: 'Kerala', city: 'Thiruvananthapuram', lon: 76.94, lat: 8.52 },
];

export const GLOBAL_NETWORK: { name: string; city: string; lon: number; lat: number }[] = [
  { name: 'Ghana', city: 'Accra', lon: -0.19, lat: 5.6 },
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
