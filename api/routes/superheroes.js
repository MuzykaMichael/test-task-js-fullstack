import express from "express";
import {
  getAllHeroes,
  getHeroById,
  addHero,
  removeHero,
  updateHero,
} from "../controllers/controllers.js";
const router = express.Router();

router.get("/:id", getAllHeroes);

router.get("/hero/:id", getHeroById);

router.post("/", addHero);

router.delete("/:id", removeHero);

router.patch("/:id", updateHero);

export default router;
