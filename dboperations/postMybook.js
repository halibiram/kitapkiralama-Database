var config = require("../dbconfig");
const sql = require("mssql");

async function postMyBook(data) {
  try {
    let pool = await sql.connect(config);
    let mybook = await pool
      .request()
      .input("username", sql.VarChar, data.username)
      .input("password", sql.VarChar, data.password)
      .input("request", sql.VarChar, data.request)
      .query("spMybooks @username , @password, @request");
    return mybook.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  postMyBook: postMyBook,
};
