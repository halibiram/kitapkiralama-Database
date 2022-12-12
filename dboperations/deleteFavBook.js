var config = require("../dbconfig");
const sql = require("mssql");

async function deleteFavBook(data) {
  try {
    let pool = await sql.connect(config);
    let favbook = await pool
      .request()
      .input("userId", sql.Int, parseInt(data.userid))
      .input("bookId", sql.Int, parseInt(data.bookid))
      .query("spDeleteFavoriBook @userId , @bookId");
    return favbook.recordset;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  deleteFavBook: deleteFavBook,
};
