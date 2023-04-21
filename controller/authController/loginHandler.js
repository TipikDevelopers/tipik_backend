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

module.exports.login = async (req, res) => {
  try {
    const { number } = req.body;
    if (!number) {
      res.status(401).json({
        err: "invalid number input",
      });
    }
    const row = await new Promise((resolve, reject) => {
      con.query(
        `select * from users where telNum = '${number}'`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    client.verify.v2
      .services(verifySid)
      .verifications.create({ to: number, channel: "sms" });
    return res.status(200).json({
      token: token,
      msg: "success",
    });
  } catch {
    return res.status(500).json({
      err: "server error",
    });
  }
};
