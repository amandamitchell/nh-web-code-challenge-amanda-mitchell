import type { LatLong } from "../types/types";

export const getCoordinatesForAddress = async (_address: string): Promise<LatLong> => {
  const coordinates: LatLong[] = [
    [45.0635514719755, -93.46779906441036],
    [44.83239979557719, -93.50265555924504],
    [44.805427491631235, -93.15926313745821],
    [45.125371275628275, -92.88094021095083],
    [45.12063732555711, -92.53162052230367],
    [44.278692930048145, -92.54539998301256],
  ];
  const randomIndex = Math.floor(Math.random() * 6);
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

export const getDistanceBetween = (_coordinates1: LatLong, _coordinates2: LatLong) => {
  const randomDistance = Math.floor(Math.random() * 100);
  console.log(
    "getDistanceBetween: using distance",
    randomDistance,
    "as distance between",
    _coordinates1,
    "and",
    _coordinates2,
  );
  return randomDistance;
};
