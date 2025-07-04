import { Router } from "express";
import RotaFacilController from "../controllers/RotaFacilController";

const router = Router();

router.post("/rotaFacil", RotaFacilController.getRotaFacil);

export default router;
