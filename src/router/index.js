import { Router } from "express";
import movies_router from "./movies.js";

let router = Router();

router.use("/movies", movies_router);

export default router;
