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
    let page = 0;
    if (req.query.page) {
      page = req.query.page;
    }
    let limit = req.query.limit ?? 5;
    // let movies = await Movie.find().skip(page).limit(limit); //Método manual de paginación
    let title = req.query.title ? new RegExp(req.query.title, "i") : "";
    let movies = await Movie.paginate({ title: title }, { limit, page }); // Método de paginación con libreria
    if (movies) {
      return res.status(200).json({
        success: true,
        quantity: movies.length,
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
