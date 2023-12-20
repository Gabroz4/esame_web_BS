import express, { Router } from "express";
import * as controller from "../controllers/esempio-controller";

const router: Router = Router();

router.get("/api/nomeapi", controller.getfunctionName);
//altri router.get

export default router