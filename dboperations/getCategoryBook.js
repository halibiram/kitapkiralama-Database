var config = require("../dbconfig");
const sql = require("mssql");

async function getCategoryBook(query) {
  try {
    let pool = await sql.connect(config);
    let book = await pool
      .request()
      .input("input_parameter", sql.Int, query.id)
      .query("spGetCategoryBook @input_parameter");

    return book.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getCategoryBook: getCategoryBook,
};
