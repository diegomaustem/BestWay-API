export interface IDadosMatrixDistanciaApi {
  destination_addresses: [string];
  origin_addresses: [string];
  rows: [
    {
      elements: [
        {
          distance: { text: string };
          duration: { text: string };
          status: string;
        }
      ];
    }
  ];
}
