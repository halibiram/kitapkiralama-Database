var config = require("../dbconfig");
const sql = require("mssql");

async function changeProfilePhoto(path, id) {
  let pool = await sql.connect(config);
  try {
    let recordData = await pool
      .request()
      .input("userId", sql.Int, id)
      .input("photoPath", sql.VarChar, path)

      .query("spChangeProfilePhoto @userId,@photoPath");
    return recordData.recordsets;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  changeProfilePhoto: changeProfilePhoto,
};
