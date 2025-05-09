import { Router } from "express";
import { RotaFacilController } from "../controllers/RotaFacilController";

const router = Router();

// router.get("/rotaFacil", RotaFacilController.getRotaFacil);

router.post("/rotaFacil", (req, res) => {
  RotaFacilController.getRotaFacil(req, res).catch((error) =>
    res.status(500).json({ error: error.message })
  );
});

export default router;
