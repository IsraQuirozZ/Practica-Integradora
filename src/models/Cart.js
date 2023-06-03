import { model, Schema, Types } from "mongoose";

let collection = "carts";

let schema = new Schema({
  user_id: { type: Types.ObjectId, required: true, ref: "users" },
  movie_id: { type: Types.ObjectId, required: true, ref: "movies" },
  quantity: { type: Number, required: true },
});

let Cart = model(collection, schema);

export default Cart;
