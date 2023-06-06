import { model, Schema } from "mongoose";

let collection = "users";

let schema = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, index: true }, //ejemplo para estadísticos que dependan de rango etario
});

let User = model(collection, schema);

export default User;
