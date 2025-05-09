import env from "../config/env";
import axios from "axios";
import { IEnderecosCoordenadas } from "../interfaces/IEnderecosCoordenadas";
import { IParEnderecosCoordenadas } from "../interfaces/IParEnderecosCoordenadas";
import { IEnderecosFormatados } from "../interfaces/IEnderecosFormatados";

export class GeocodificacaoService {
  public static async getLocalizacaoGeografica(
    enderecos: IEnderecosFormatados,
    components: string = "country:BR"
  ) {
    const url = "https://api.distancematrix.ai/maps/api/geocode/json";
    try {
      const [localizacaoOrigem, localizacaoDestino] = await Promise.all([
        axios.get<IEnderecosCoordenadas>(url, {
          params: {
            address: enderecos.origem,
            key: env.geocodificacaoApiKey,
            components,
          },
        }),
        axios.get<IEnderecosCoordenadas>(url, {
          params: {
            address: enderecos.destino,
            key: env.geocodificacaoApiKey,
            components,
          },
        }),
      ]);

      const dadosEnderecosOD = this.formataLocalizacaoGeografica(
        localizacaoOrigem.data,
        localizacaoDestino.data
      );

      return dadosEnderecosOD;
    } catch (error) {
      console.error("Erro no serviço DistanceMatrix:", error);
      throw error;
    }
  }

  public static async getCoordenadasGeograficas(
    enderecos: IEnderecosFormatados
  ) {
    return this.getLocalizacaoGeografica(enderecos);
  }

  private static formataLocalizacaoGeografica(
    localizacaoOrigem: IEnderecosCoordenadas,
    localizacaoDestino: IEnderecosCoordenadas
  ): IParEnderecosCoordenadas {
    return {
      origem: {
        endereco: localizacaoOrigem.result[0].formatted_address,
        latitude: localizacaoOrigem.result[0].geometry.location.lat,
        longitude: localizacaoOrigem.result[0].geometry.location.lng,
      },
      destino: {
        endereco: localizacaoDestino.result[0].formatted_address,
        latitude: localizacaoDestino.result[0].geometry.location.lat,
        longitude: localizacaoDestino.result[0].geometry.location.lng,
      },
    };
  }
}
