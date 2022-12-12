var config = require("../dbconfig");
const sql = require("mssql");

async function getBookLocation(data) {
  try {
    let pool = await sql.connect(config);
    let location = await pool
      .request()
      .input("bookId", sql.Int, data.bookId)
      .input("shelfId", sql.Int, data.shelfId)
      .query("spGetBookLocation @bookId,@shelfId");

    return location.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBookLocation: getBookLocation,
};
