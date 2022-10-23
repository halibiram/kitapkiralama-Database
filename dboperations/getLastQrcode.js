var config = require("../dbconfig");
const sql = require("mssql");

async function getlastqQrcode() {
  try {
    let pool = await sql.connect(config);
    let getQrcode = await pool
      .request()
      .query("select top(1) karekodNo from karekodlar order by karekodNo desc");
    console.log(getQrcode.recordset[0].karekodNo);
    return getQrcode.recordset[0].karekodNo;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getlastqQrcode: getlastqQrcode,
};
