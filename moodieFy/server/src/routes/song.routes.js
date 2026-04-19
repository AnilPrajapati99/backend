import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import uploadSong, { getSong } from "../controllers/song.controlers.js";

const router = Router();

router.post("/post", upload.single("song"), uploadSong);
router.get("/get", getSong);

export default router;
