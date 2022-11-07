var config = require("../dbconfig");
const sql = require("mssql");

async function register(newuser) {
  try {
    let pool = await sql.connect(config);
    let registering = await pool
      .request()
      .input("email", sql.VarChar, newuser.email)
      .input("name", sql.NVarChar, newuser.name)
      .input("surname", sql.NVarChar, newuser.surname)
      .input("username", sql.VarChar, newuser.username)
      .input("password", sql.NVarChar, newuser.password)
      .input("birthdate", sql.Date, newuser.birthdate)
      .input("gender", sql.Int, newuser.gender)
      .query(
        "spRegister @email,@name,@surname,@username,@password,@birthdate,@gender"
      );
    return registering.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  register: register,
};
