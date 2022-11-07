var config = require("../dbconfig");
const sql = require("mssql");

async function getSearch(param) {
  try {
    let pool = await sql.connect(config);

    let products = await pool
      .request()
      .input("param", sql.VarChar, param)
      .query("spSearch @param");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getSearch: getSearch,
};
