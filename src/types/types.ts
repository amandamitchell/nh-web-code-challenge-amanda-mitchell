export type LatLong = [number, number];

export type Clinician = {
  name: string;
  address: string;
  coordinates: LatLong;
};

export type Lab = {
  name: string;
  address: string;
  coordinates: LatLong;
};

export type NearbyClinician = {
  name: Clinician["name"];
  address: Clinician["address"];
  distance: number;
  lab?: {
    name: Lab["name"];
    address: Lab["address"];
  };
};

export type AddressFormState = {
  address?: string;
  lab?: boolean;
  error?: boolean;
  clinicians?: NearbyClinician[];
};
