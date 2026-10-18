import "reflect-metadata";
import app from "./src/app";
import DbInstance from "./src/DB/dbInstance";

const port = process.env.PORT || 5000;

const server = () => {
  DbInstance.connect();
  app.listen(port, () => console.log("Server listening at port: " + port));
};

server();
