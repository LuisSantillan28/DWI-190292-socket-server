import Server from "./classes/server";
import router from "./routes/route";
import bodyParser from "body-parser";
import cors from "cors";

const server = new Server();
/*const server = Server.instance;*/

server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

server.app.use(cors({ origin: true, credentials: true }));

server.app.use("/", router);

server.start(() => {
  console.log(`el servidor esta levantado en el puerto ${server.port}`);
});
