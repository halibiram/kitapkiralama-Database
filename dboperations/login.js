var config = require("../dbconfig");
const sql = require("mssql");

async function login(user) {
  try {
    let pool = await sql.connect(config);
    let logging = await pool
      .request()
      .input("username", sql.NVarChar, user.username)
      .input("password", sql.NVarChar, user.password)

      .query("spLogin @username , @password");

    return logging.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  login: login,
};
