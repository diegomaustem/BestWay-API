import * as dotenv from "dotenv";

dotenv.config();

interface IEnv {
  porta: string | number;
  distanceMatrixApiKey: string;
}

const env: IEnv = {
  porta: process.env.PORT || 3000,
  distanceMatrixApiKey: process.env.DISTANCE_MATRIX_API_KEY || "",
};

export default env;
