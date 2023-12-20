import express from "express";
import controller from "../controllers/esempio-controller";

const router = express.Router();
router.get("/api/nomeapi", controller)