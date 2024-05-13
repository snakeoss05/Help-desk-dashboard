import express from "express";
import {
  getMessages,
  sendMessage,
  getUsersForSidebar,
} from "../controller/chat.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

export default router;
