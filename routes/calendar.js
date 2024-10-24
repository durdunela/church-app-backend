import { Router } from "express";
import { calendarFetcher } from "../controller/calendar.js";

const router = Router();

router.get("/", calendarFetcher);

export default router;
