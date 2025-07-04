import * as dotenv from "dotenv";

dotenv.config();

interface IEnv {
  porta: string | number;
  matrixDistanciaApiKey: string;
  url: string;
}

const env: IEnv = {
  porta: process.env.PORT || 3000,
  matrixDistanciaApiKey: process.env.MATRIXDISTANCIA_API_KEY || "",
  url: "https://api.distancematrix.ai/maps/api/distancematrix/json",
};

export default env;
