var config = require("../dbconfig");
const sql = require("mssql");

async function getBookcase() {
  try {
    let pool = await sql.connect(config);
    let products = await pool
      .request()

      .query("select * from dolaplar");

    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBookcase: getBookcase,
};
