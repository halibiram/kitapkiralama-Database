var config = require("../dbconfig");
const sql = require("mssql");

async function getLastAddBook() {
  try {
    let pool = await sql.connect(config);
    let book = await pool
      .request()
      .query("Select top(1)* from kitaplar order by kitapno desc");

    return book.recordset[0].kitapno;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getLastAddBook: getLastAddBook,
};
