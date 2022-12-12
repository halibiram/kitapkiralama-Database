var config = require("../dbconfig");
const sql = require("mssql");

async function patchDeliverBook(data) {
  let pool = await sql.connect(config);
  try {
    let recordData = await pool
      .request()
      .input("bookId", sql.Int, data.bookId)
      .input("bookcaseId", sql.Int, data.bookcaseId)
      .input("userId", sql.Int, data.userId)

      .query("spDeliverBook @bookcaseId,@bookId,@UserId");
    return recordData.recordsets;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  patchDeliverBook: patchDeliverBook,
};
