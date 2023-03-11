const con = require("../../utils/dbConnect");
const express = require("express");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    con.query(`select * from user where email = "${email}"`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json({
          res: result,
        });
      }
    });
  } catch {}
};
