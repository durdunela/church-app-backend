import { Router } from "express";
import { showFetchedShows } from "../controller/show.js";

const router = Router();

router.get("/", showFetchedShows);

export default router;
