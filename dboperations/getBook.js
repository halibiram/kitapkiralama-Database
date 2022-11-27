var config = require("../dbconfig");
const sql = require("mssql");

async function getBook(bookId) {
  try {
    let pool = await sql.connect(config);
    let products = await pool
      .request()
      .input("input_parameter", sql.Int, bookId)
      .query("spGetBookInfo @input_parameter");

    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBook: getBook,
};
