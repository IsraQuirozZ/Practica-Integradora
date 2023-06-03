import { model, Schema } from "mongoose";

let collection = "users";

let schema = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
});

let User = model(collection, schema);

export default User;
