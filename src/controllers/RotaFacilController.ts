import { Request, Response } from "express";
import { GeocodificacaoService } from "../services/GeocodificacaoService";
import { MatrixDistanciaService } from "../services/MatrixDistanciaService";
import { IEnderecoOrigemDestino } from "../interfaces/IEnderecoOrigemDestino";
import { IEnderecosFormatados } from "../interfaces/IEnderecosFormatados";

export class RotaFacilController {
  public static async getRotaFacil(
    req: Request,
    res: Response
  ): Promise<Response> {
    if (!req.body.origem || !req.body.destino) {
      return res.status(400).json({
        error: 'Estrutura inválida. São obrigatórios: "origem" e "destino"',
      });
    }

    const enderecosOD = this.parseEnderecos(req.body);

    if (!enderecosOD) {
      return res.status(400).json({
        error: "Formato dos endereços inválidos!",
      });
    }

    try {
      const coordenadasOD =
        await GeocodificacaoService.getCoordenadasGeograficas(enderecosOD);

      const percursoCompleto = await MatrixDistanciaService.getPercursoCompleto(
        coordenadasOD
      );

      return res.json(percursoCompleto);
    } catch (error) {
      return res.status(500).json(this.trataStringErros(error));
    }
  }

  private static trataStringErros(error: any) {
    return { error: error.message };
  }

  private static parseEnderecos(
    enderecosOD: IEnderecoOrigemDestino
  ): IEnderecosFormatados | null {
    const camposObrigatorios = ["logradouro", "cidade", "estado"] as const;

    if (
      camposObrigatorios.some(
        (campo) =>
          !enderecosOD.origem[campo]?.trim() ||
          !enderecosOD.destino[campo]?.trim()
      )
    ) {
      return null;
    }

    return {
      origem: [
        enderecosOD.origem.logradouro,
        enderecosOD.origem.numero?.toString().trim(),
        enderecosOD.origem.cidade,
        enderecosOD.origem.estado,
      ]
        .filter(Boolean)
        .join(","),

      destino: [
        enderecosOD.destino.logradouro,
        enderecosOD.destino.numero?.toString().trim(),
        enderecosOD.destino.cidade,
        enderecosOD.destino.estado,
      ]
        .filter(Boolean)
        .join(","),
    };
  }
}
