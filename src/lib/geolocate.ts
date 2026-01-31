import type { LatLong } from "../types/types";

export const getCoordinatesForAddress = async (_address: string): Promise<LatLong> => {
  const coordinates: LatLong[] = [
    [45.0635514719755, -93.46779906441036],
    [44.83239979557719, -93.50265555924504],
    [44.805427491631235, -93.15926313745821],
    [45.125371275628275, -92.88094021095083],
    [45.12063732555711, -92.53162052230367],
    [44.278692930048145, -92.54539998301256],
    [40.07955432485599, -105.02099535669548],
  ];
  const randomIndex = Math.floor(Math.random() * 7);
  console.log(
    "getCoordinatesForAddress: using randomIndex",
    randomIndex,
    "and coordinates",
    coordinates[randomIndex],
    "for address",
    _address,
  );
  return coordinates[randomIndex];
};

// formula from https://www.movable-type.co.uk/scripts/latlong.html
export const getDistanceBetween = (coordinates1: LatLong, coordinates2: LatLong) => {
  const radius = 6371e3; // in meters
  const lat1Radians = (coordinates1[0] * Math.PI) / 180;
  const lat2Radians = (coordinates2[0] * Math.PI) / 180;
  const latDiff = ((coordinates2[0] - coordinates1[0]) * Math.PI) / 180;
  const longDiff = ((coordinates2[1] - coordinates1[1]) * Math.PI) / 180;

  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(lat1Radians) * Math.cos(lat2Radians) * Math.sin(longDiff / 2) * Math.sin(longDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = radius * c; // in meters
  return distance / 1609; // convert to miles
};
