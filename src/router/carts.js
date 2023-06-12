import { Router } from "express";
import Cart from "../models/Cart.js";
import { Types } from "mongoose";

let router = Router();

router.post("/", async (req, res, next) => {
  try {
    let cart = await Cart.create(req.body);
    return res.status(201).json({
      success: true,
      response: cart,
    });
  } catch (error) {
    next(error);
  }
});

// READ ALL
router.get("/", async (req, res, next) => {
  try {
    let carts = await Cart.find()
      .select("user_id movie_id -_id")
      .populate("user_id", "name -_id")
      .populate("movie_id", "title -_id");
    return res.status(200).json({
      success: true,
      response: carts,
    });
  } catch (error) {
    next(error);
  }
});

// READ CARTS FROM ONE USER
router.get("/users/:uid", async (req, res, next) => {
  try {
    const uid = req.params.uid;
    let carts = await Cart.find({ user_id: uid }).select(
      "user_id movie_id -_id"
    );
    //   .populate("user_id", "name -_id")
    //   .populate("movie_id", "title -_id");
    // configurar condicional si carts no existe
    return res.status(200).json({
      success: true,
      response: carts,
    });
  } catch (error) {
    next(error);
  }
});

// READ BILL FROM ONE USER
router.get("/bills/:uid", async (req, res, next) => {
  try {
    // let all = await Cart.find();
    let userId = req.params.uid;
    let data = await Cart.aggregate([
      { $match: { user_id: new Types.ObjectId(userId) } }, //filtro carrito por usuario
      {
        $lookup: {
          foreignField: "_id",
          from: "users",
          localField: "user_id",
          as: "user_id",
        },
      }, //pupulate los datos del usuario
      {
        $lookup: {
          foreignField: "_id",
          from: "movies",
          localField: "movie_id",
          as: "movie_id",
        },
      },
      {
        $replaceRoot: {
          // Reemplazo la ubicación de los elementos del array populados
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$movie_id", 0] }, "$$ROOT"],
          },
        },
      },
      { $set: { total: { $multiply: ["$quantity", "$price"] } } }, // Agregamos la propiedad total que tiene el resultado del precio x cantidad
      {
        $project: {
          movie_id: 0,
          quantity: 0,
          price: 0,
          capacity: 0,
          __v: 0,
          active: 0,
        },
      }, // limpia el objeto
      { $group: { _id: "$user_id", sum: { $sum: "$total" } } }, // agrupo y reduzco
      { $project: { _id: 0, user_id: "$_id", sum: "$sum" } },
      { $merge: { into: "bills" } },
    ]);
    return res.status(200).json({ success: true, response: data });
  } catch (error) {
    next(error);
  }
});

// UPDATE CARTS
router.put("/:cid", async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const data = req.body;
    const cart = await Cart.findByIdAndUpdate(cid, data, {
      new: true,
    }).populate("user_id", "name -_id");
    return res.status(200).json({
      success: true,
      response: cart,
    });
  } catch (error) {
    next(error);
  }
});

// UPDATE CART FROM ONE USER
router.put("/users/:uid", async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const carts = await Cart.updateMany({ user_id: uid }, { active: false });
    return res.status(200).json({
      success: true,
      response: carts,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE CART
router.delete("/:cid", async (req, res, next) => {
  try {
    const cid = req.params.cid;
    let cart = await Cart.findByIdAndDelete(cid, { new: true });
    //agregar condicional
    return res.status(200).json({
      success: true,
      response: cart,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
