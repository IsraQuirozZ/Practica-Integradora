import { Router } from "express";
import User from "../models/User.js";

let router = Router();

router.post("/", async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    return res.status(201).json({
      success: true,
      response: `user: ${user.name} created with id: "${user._id}"`,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let users = await User.find();
    if (users) {
      return res.status(200).json({
        success: true,
        quantity: users.length,
        response: users,
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
    if (Object.entries(data).length === 0) {
      return res.status(400).json({
        success: false,
        response: `check your data`,
      });
    }
    let user = await User.findByIdAndUpdate(id, data, { new: true });
    if (user) {
      return res.status(200).json({
        success: true,
        response: user,
      });
    } else {
      return res.status(404).json({
        success: false,
        response: `not found user with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await User.findByIdAndDelete(id);
    if (user) {
      return res.status(200).json({
        success: true,
        response: `User "${user._id}": ${user.name} ${user.last_name} deleted`,
      });
    } else {
      return res.status(404).json({
        success: false,
        response: "not found user",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
