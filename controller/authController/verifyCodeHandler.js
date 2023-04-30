const con = require("../../utils/dbConnect");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const verifySid = process.env.VERIFY_SID;
const client = require("twilio")(accountSid, authToken);
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports.verifyCode = async (req, res) => {
  try {
    const { otp, number } = req.body;
    if (!otp || !number)
      return res.status(401).json({
        err: "bad request",
      });
    try {
      const token = jwt.sign(
        {
          number: row,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "3m",
        }
      );
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: number, code: otp })
        .then((verification_check) =>
          res.status(200).json({
            token: token,
            response: verification_check.status,
          })
        );
    } catch {
      return res.status(401).json({
        err: "wrong number or invalid otp code format",
      });
    }
  } catch {
    return res.status(500).json({
      err: "server error",
    });
  }
};
