import { Request, Response } from "express";
import { GeocodificacaoService } from "../services/GeocodificacaoService";
import { MatrixDistanciaService } from "../services/MatrixDistanciaService";
import { IEntradaEnderecos } from "../interfaces/IEntradaEnderecos";
import { IEnderecos } from "../interfaces/IEnderecos";

export class RotaFacilController {
  public static async getRotaFacil(
    req: Request,
    res: Response
  ): Promise<Response> {
    if (!req.body.origem || !req.body.destino) {
      return res.status(400).json({
        error:
          'Estrutura inválida. Obrigatório: "origem" e "destino" nos endereços.',
      });
    }

    const enderecosOD = this.formataEnderecosOD(req.body);

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
      return res.status(500).json({
        error,
        message: "Erro interno no servidor. Tente mais tarde!",
      });
    }
  }

  private static formataEnderecosOD(
    entradaEnderecos: IEntradaEnderecos
  ): IEnderecos | null {
    const camposObrigatorios = ["logradouro", "cidade", "estado"] as const;

    if (
      camposObrigatorios.some(
        (campo) =>
          !entradaEnderecos.origem[campo]?.trim() ||
          !entradaEnderecos.destino[campo]?.trim()
      )
    ) {
      return null;
    }

    const formataEndereco = (endereco: typeof entradaEnderecos.origem) =>
      [
        endereco.logradouro,
        endereco.numero?.toString().trim(),
        endereco.cidade,
        endereco.estado,
      ]
        .filter(Boolean)
        .join(",");

    return {
      origem: formataEndereco(entradaEnderecos.origem),
      destino: formataEndereco(entradaEnderecos.destino),
    };
  }
}
