import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import uploadSong, {
  getAllSong,
  getSong,
} from "../controllers/song.controlers.js";

const router = Router();

router.post("/post", upload.single("song"), uploadSong);
router.get("/get", getSong);
router.get("/getAll", getAllSong);

export default router;
