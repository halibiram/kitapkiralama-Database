var config = require("../dbconfig");
const sql = require("mssql");

async function getCategory(param) {
  try {
    let pool = await sql.connect(config);

    let category = await pool
      .request()

      .query("getCategory");
    return category.recordsets;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getCategory: getCategory,
};
