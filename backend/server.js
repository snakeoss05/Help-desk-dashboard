import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db.js";
import { app, server } from "./socket.js";
import messageRoutes from "./routes/chat.js";
import notificationsRoutes from "./routes/notifications.js";
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type", "Authorization");
  next();
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("*", (req, res) => res.status(404).json({ error: "ops not found" }));
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
