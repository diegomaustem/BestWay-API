import * as dotenv from "dotenv";

dotenv.config();

interface IEnv {
  porta: string | number;
  geocodificacaoApiKey: string;
  matrixDistanciaApiKey: string;
}

const env: IEnv = {
  porta: process.env.PORT || 3000,
  geocodificacaoApiKey: process.env.GEOCODIFICACAO_API_KEY || "",
  matrixDistanciaApiKey: process.env.MATRIXDISTANCIA_API_KEY || "",
};

export default env;
