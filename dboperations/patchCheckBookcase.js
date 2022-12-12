var config = require("../dbconfig");
const sql = require("mssql");

async function patchCheckBookcase(data) {
  let pool = await sql.connect(config);
  try {
    let recordData = await pool
      .request()
      .input("bookId", sql.Int, data.bookId)
      .input("bookcaseId", sql.Int, data.bookcaseId)

      .query("spCheckBookcase @bookcaseId,@bookId");
    return recordData.recordsets;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  patchCheckBookcase: patchCheckBookcase,
};
