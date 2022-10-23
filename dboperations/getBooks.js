var config = require("../dbconfig");
const sql = require("mssql");

async function getBooks() {
  try {
    let pool = await sql.connect(config);

    let products = await pool.request().query("Select * from kitaplar");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getBooks: getBooks,
};
