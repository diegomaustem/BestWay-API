export interface DistanceValue {
  text: string;
  value: number;
}

export interface DistanceMatrixElement {
  distance: DistanceValue;
  duration: DistanceValue;
  origin: string;
  destination: string;
  status: string;
}

export interface DistanceMatrixRow {
  elements: DistanceMatrixElement[];
}

export interface IDistanceMatrixResponse {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: DistanceMatrixRow[];
  status: string;
  error_message?: string;
}
