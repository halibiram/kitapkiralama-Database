var config = require("../dbconfig");
const sql = require("mssql");

async function getQrcode(input) {
  try {
    let pool = await sql.connect(config);
    let products = await pool
      .request()
      .input("userId", sql.Int, input.userId)
      .input("qrcodeId", sql.Int, input.qrcodeId)
      .query("spGetQrcode @userId , @qrcodeId");

    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getQrcode: getQrcode,
};
