import env from "../config/env";
import axios from "axios";
import { IEnderecosCoordenadas } from "../interfaces/IEnderecosCoordenadas";
import { IParEnderecoCoordenadas } from "../interfaces/IParEnderecoCoordenadas";
import { IEnderecos } from "../interfaces/IEnderecos";

export class GeocodificacaoService {
  public static async getLocalizacaoGeografica(
    enderecos: IEnderecos,
    components: string = "country:BR"
  ): Promise<IParEnderecoCoordenadas> {
    const url = "https://api.distancematrix.ai/maps/api/geocode/json";
    try {
      const endpoints = ["origem", "destino"] as const;
      const [localizacaoOrigem, localizacaoDestino] = await Promise.all(
        endpoints.map((e) =>
          axios.get<IEnderecosCoordenadas>(url, {
            params: {
              address: enderecos[e],
              key: env.geocodificacaoApiKey,
              components,
            },
          })
        )
      );

      const dadosEnderecosOD = this.formataLocalizacaoGeografica(
        localizacaoOrigem.data,
        localizacaoDestino.data
      );

      return dadosEnderecosOD;
    } catch (error) {
      console.error("Erro no serviço Geocodificação:", error);
      throw new Error("Falha no serviço de Geocodificação. Tente mais tarde!", {
        cause: error,
      });
    }
  }

  public static async getCoordenadasGeograficas(enderecos: IEnderecos) {
    return this.getLocalizacaoGeografica(enderecos);
  }

  private static formataLocalizacaoGeografica(
    localizacaoOrigem: IEnderecosCoordenadas,
    localizacaoDestino: IEnderecosCoordenadas
  ): IParEnderecoCoordenadas {
    const getCoordenadas = (localizacao: IEnderecosCoordenadas) => ({
      endereco: localizacao.result[0].formatted_address,
      latitude: localizacao.result[0].geometry.location.lat,
      longitude: localizacao.result[0].geometry.location.lng,
    });

    return {
      origem: getCoordenadas(localizacaoOrigem),
      destino: getCoordenadas(localizacaoDestino),
    };
  }
}
