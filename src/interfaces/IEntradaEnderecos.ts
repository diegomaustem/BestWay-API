export interface IEntradaEnderecos {
  origem: {
    logradouro: string;
    numero: number | string;
    cidade: string;
    estado: string;
  };
  destino: {
    logradouro: string;
    numero: number | string;
    cidade: string;
    estado: string;
  };
}
