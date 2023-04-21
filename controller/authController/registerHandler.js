const con = require("../../utils/dbConnect");
const express = require("express");
const { default: axios } = require("axios");
const convert = require("xml2json");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
let userId = 12;
module.exports.register = async (req, res) => {
  try {
    let user;
    let isUser; //parameter for checking if user exists in tc database

    const { firstName, lastName, year, tc, number } = req.body;

    if (!firstName || !lastName || !tc) {
      return res.status(401).json({
        err: "invalid or empty body parameter",
      });
    }

    const row = await new Promise((resolve, reject) => {
      con.query(
        `select telNum from users where telNum = '${number}'`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    if (row.length != 0) {
      return res.status(409).json({
        err: "user already exist",
      });
    }
    const url = "https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx";

    const data = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
      <TCKimlikNo>${tc}</TCKimlikNo>
      <Ad>${firstName}</Ad>
      <Soyad>${lastName}</Soyad>
      <DogumYili>${year}</DogumYili>
    </TCKimlikNoDogrula>
  </soap12:Body>
</soap12:Envelope>`;

    const config = {
      headers: {
        "Content-Type": "application/soap+xml",
      },
    };

    await axios.post(url, data, config).then(async (res) => {
      let res2 = convert.toJson(res.data);
      const res2Obj = JSON.parse(res2);
      isUser =
        res2Obj["soap:Envelope"]["soap:Body"]["TCKimlikNoDogrulaResponse"][
          "TCKimlikNoDogrulaResult"
        ];
    });
    if (isUser == "true") isUser = true;
    else isUser = false;

    if (isUser) {
      con.query(
        `insert into  users (iduser,firstName,lastName, telNum) values (${userId},'${firstName}','${lastName}','${number}');`
      );
      userId++;

      return res.status(200).json({
        msg: "success",
      });
    }

    return res.status(404).json({
      err: "user does not exists in tc database",
    });
  } catch {
    return res.status(500).json({
      err: "server side error",
    });
  }
};
