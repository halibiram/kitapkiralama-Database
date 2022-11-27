var config = require("../dbconfig");
const sql = require("mssql");
const register = require("./register");

async function postRentBook(data) {
  let pool = await sql.connect(config);
  try {
    let recordData = await pool
      .request()
      .input("bookId", sql.Int, data.bookId)
      .input("username", sql.VarChar, data.username)
      .input("password", sql.VarChar, data.password)
      .input("date", sql.Date, data.date)
      .query("spRentABook @bookId, @username,@password,@date");
    return recordData.recordsets;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  postRentBook: postRentBook,
};
