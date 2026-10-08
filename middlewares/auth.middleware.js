import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(decoded.userId).select("-password");

        if (!currentUser) {
          return res.status(401).json({
            message: "User not found"
          });
        }

        req.user = {
          id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email
        }

        next();

      } catch (error) {
        return res.status(403).json({
          message: "Authorization Error, current user not found"
        })
      }

    } else {
      return res.status(403).json({
        message: "Authorization Error, token not found"
      })
    }

  } catch (error) {
    return res.status(500).json({
      message: "Authorization Error, server down"
    })
  }

}
