import server from "./app.js";
import { connect } from "mongoose";

const port = process.env.PORT || 8080;
const ready = () => {
  console.log("server ready on port " + port);
  connect(process.env.MONGO_LINK)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
};

server.listen(port, ready);
