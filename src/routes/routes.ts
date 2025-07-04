import { Router } from "express";
import { validate } from "../middlewares/validationMiddleware";
import { rotaFacilSchema } from "../validations/rotaFacilSchema";
import RotaFacilController from "../controllers/RotaFacilController";

const router = Router();

router.post(
  "/rotaFacil",
  validate(rotaFacilSchema, "body"),
  RotaFacilController.getRotaFacil
);

export default router;
