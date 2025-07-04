import env from "../config/env";
import axios, { AxiosResponse } from "axios";
import { IDistanceMatrixResponse } from "../interfaces/IMatrix";
import { IEnderecos } from "../interfaces/IEnderecos";

class MatrixDistanciaService {
  async getCalculaPercursos(
    enderecos: IEnderecos
  ): Promise<IDistanceMatrixResponse> {
    try {
      const { origem, destino } = enderecos;
      const percursosCalculados: AxiosResponse<IDistanceMatrixResponse> =
        await axios.get(env.url, {
          params: {
            origins: origem,
            destinations: destino,
            key: env.matrixDistanciaApiKey,
          },
        });

      return percursosCalculados.data;
    } catch (error) {
      console.error("Erro no serviço MatrixDistancia.", error);
      throw error;
    }
  }
}

export default new MatrixDistanciaService();
