const express = require("express");
const jwt = require("jsonwebtoken");

module.exports =
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction}
   */

  async (req, res, next) => {
    try {
      //find JWT in Headers
      const token = req.headers["authorization"];
      if (!token) {
        return res.status(401).send("Acces Denied");
      } else {
        const bearerToken = token.split(" ")[1];
        const tokenDecode = jwt.verify(bearerToken, process.env.SECRET_KEY);
        const user = await User.findById(
          new mongoose.Types.ObjectId(tokenDecode.user_id)
        );

        if (!user) {
          return res.status(401).json({
            message: "User not found",
          });
        }
        req.user = user;

        next();
      }
    } catch (error) {
      res.status(401).json({ message: "error", error });
    }
  };
