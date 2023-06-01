import { Router } from "express";
import Movie from "../models/Movie.js";

let router = Router();

router.post("/", async (req, res, next) => {
  try {
    let movie = await Movie.create(req.body);
    return res.status(201).json({
      success: true,
      message: `movie id=${movie._id} created`,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let movies = await Movie.find();
    if (movies) {
      return res.status(200).json({
        success: true,
        response: movies,
      });
    } else {
      return res.status(404).json({
        success: false,
        response: "not found movies",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let movie = await Movie.findByIdAndUpdate(id, data, { new: true });
    if (movie) {
      return res.status(200).json({
        success: true,
        response: movie,
      });
    } else {
      return res.status(404).json({
        success: false,
        response: "not found movie",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let movie = await Movie.findByIdAndDelete(id);
    if (movie) {
      return res.status(200).json({
        success: true,
        response: `movie: "${movie.title}" deleted`,
      });
    } else {
      return res.status(404).json({
        success: false,
        response: "not found movie",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
