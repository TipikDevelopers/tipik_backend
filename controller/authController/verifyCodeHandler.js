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
    const { otp } = req.body;
    client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: "+905063622251", code: otp })
      .then((verification_check) => console.log(verification_check.status));
  } catch {}
};
