import env from "../config/env";
import axios from "axios";
import { IParEnderecoCoordenadas } from "../interfaces/IParEnderecoCoordenadas";
import { IDadosMatrixRetorno } from "../interfaces/MatrixDistancia/IDadosMatrixRetorno";
import { IDadosMatrixDistanciaApi } from "../interfaces/MatrixDistancia/IDadosMatrixDistanciaApi";

export class MatrixDistanciaService {
  public static async getPercursoCompleto(enderecos: IParEnderecoCoordenadas) {
    const url = "https://api.distancematrix.ai/maps/api/distancematrix/json";

    try {
      const trajetoCompleto = await axios.get<IDadosMatrixDistanciaApi>(url, {
        params: {
          origins: this.formataCoordenadas(
            enderecos.origem.latitude,
            enderecos.origem.longitude
          ),
          destinations: this.formataCoordenadas(
            enderecos.destino.latitude,
            enderecos.destino.longitude
          ),
          key: env.matrixDistanciaApiKey,
        },
      });

      return this.formataTrajeto(trajetoCompleto.data);
    } catch (error) {
      console.error("Erro no serviço MatrixDistancia:", error);
      throw new Error(
        "Falha no serviço de MatrixDistancia. Tente mais tarde!",
        {
          cause: error,
        }
      );
    }
  }

  private static formataCoordenadas(
    latitude: number,
    longitude: number
  ): string {
    return `${latitude},${longitude}`;
  }

  private static formataTrajeto(
    trajeto: IDadosMatrixDistanciaApi
  ): IDadosMatrixRetorno {
    return {
      destination: trajeto.destination_addresses?.[0] ?? "Destino deconhecido.",
      origin: trajeto.origin_addresses?.[0] ?? "Origem desconhecida.",
      distance: trajeto.rows?.[0]?.elements?.[0]?.distance?.text ?? "0 km",
      duration: trajeto.rows?.[0]?.elements?.[0]?.duration?.text ?? "0 min",
      status: trajeto.rows?.[0]?.elements?.[0]?.status ?? "Indisponível",
    };
  }
}
