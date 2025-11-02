import { Router } from "express";
import { getAll } from "../controllers/theaters/controller";

const router = Router()

router.get('/', getAll)

export default router