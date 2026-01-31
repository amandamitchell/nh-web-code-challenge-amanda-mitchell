import type { AddressFormState, Lab, LatLong, NearbyClinician } from "../types/types";
import { getClinicians, getLabs } from "./data";
import { getCoordinatesForAddress, getDistanceBetween } from "./geolocate";

export const searchAddress = async (_: AddressFormState, formData: FormData): Promise<AddressFormState> => {
  const address = formData.get("address")?.toString();
  const lab = Boolean(formData.get("lab"));

  if (!address) {
    return {
      error: true,
      lab,
      address,
    };
  }

  const patientCoordinates = await getCoordinatesForAddress(address);
  const clinicians = lab
    ? await findNearestClinicianAndLab(patientCoordinates)
    : await findNearestClinician(patientCoordinates);

  return { address, lab, error: false, clinicians };
};

const findNearestClinician = async (patientCoordinates: LatLong): Promise<NearbyClinician[]> => {
  const clinicianData = await getClinicians();
  const nearbyClinicians: NearbyClinician[] = clinicianData.map((clinician) => ({
    name: clinician.name,
    address: clinician.address,
    distance: getDistanceBetween(patientCoordinates, clinician.coordinates) * 2,
  }));
  nearbyClinicians.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  return nearbyClinicians.slice(0, 3);
};

const findNearestClinicianAndLab = async (patientCoordinates: LatLong): Promise<NearbyClinician[]> => {
  const [clinicianData, labData] = await Promise.all([getClinicians(), getLabs()]);
  const nearbyClinicians = clinicianData.flatMap((clinician) => {
    const distanceFromPatient = getDistanceBetween(patientCoordinates, clinician.coordinates);
    let nearestLabDistance = Infinity;
    let nearestLab: Lab | null = null;
    for (const lab of labData) {
      const labDistanceFromPatient = getDistanceBetween(patientCoordinates, lab.coordinates);
      const labDistanceFromClinician = getDistanceBetween(clinician.coordinates, lab.coordinates);
      if (labDistanceFromPatient + labDistanceFromClinician < nearestLabDistance) {
        nearestLabDistance = labDistanceFromPatient + labDistanceFromClinician;
        nearestLab = lab;
      }
    }
    if (nearestLab === null) return [];
    return [
      {
        name: clinician.name,
        address: clinician.address,
        distance: distanceFromPatient + nearestLabDistance,
        lab: {
          name: nearestLab.name,
          address: nearestLab.address,
        },
      } satisfies NearbyClinician,
    ];
  });
  nearbyClinicians.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  return nearbyClinicians.slice(0, 3);
};
