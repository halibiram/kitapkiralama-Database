var config = require("../dbconfig");
const sql = require("mssql");

async function getBooks(param) {
  try {
    let pool = await sql.connect(config);

    let products = await pool
      .request()
      .input("param", sql.VarChar, param)
      .query("spGetBook @param");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getBooks: getBooks,
};
