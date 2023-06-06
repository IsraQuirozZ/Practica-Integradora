import { model, Schema } from "mongoose";

let collection = "movies";

let schema = new Schema({
  title: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true, index: true },
});

let Movie = model(collection, schema);

export default Movie;
