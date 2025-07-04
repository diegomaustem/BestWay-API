import { Request, Response } from "express";
import { IEnderecos } from "../interfaces/IEnderecos";
import MatrixDistanciaService from "../services/MatrixDistanciaService";

class RotaFacilController {
  async getRotaFacil(req: Request, res: Response): Promise<void> {
    const origem: string = req.body.origem.toString();
    const destino: string = req.body.destino.toString();

    if (!origem || !destino) {
      res.status(400).json({
        code: 400,
        status: "error",
        message: "É necessário informar origem e destino.",
      });
      return;
    }

    const enderecos: IEnderecos = {
      origem: origem,
      destino: destino,
    };

    try {
      const percursos = await MatrixDistanciaService.getCalculaPercursos(
        enderecos
      );
      res
        .status(200)
        .json({ code: 200, status: "success", percursos: percursos });
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Erro interno no servidor. Tente mais tarde!",
      });
    }
  }
}

export default new RotaFacilController();
