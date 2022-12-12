var config = require("../dbconfig");
const sql = require("mssql");

async function postAddFavBook(data) {
  try {
    let pool = await sql.connect(config);
    let favbook = await pool
      .request()
      .input("userId", sql.Int, data.userId)
      .input("bookId", sql.Int, data.bookId)
      .query("spAddFavoriBook @userId , @bookId");
    return favbook.recordset;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  postAddFavBook: postAddFavBook,
};
