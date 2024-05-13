import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    return decodedToken.userId;
  } catch (err) {
    throw new Error(err.message);
  }
};
