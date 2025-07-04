import { Request, Response } from "express";
import { IEnderecos } from "../interfaces/IEnderecos";
import MatrixDistanciaService from "../services/MatrixDistanciaService";

class RotaFacilController {
  async getRotaFacil(req: Request, res: Response): Promise<void> {
    const enderecos: IEnderecos = {
      origem: req.body.origem,
      destino: req.body.destino,
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
