const { PythonShell } = require("python-shell");
var config = require("../dbconfig");
const sql = require("mssql");
async function createQr(Id_path, Id, qrType) {
  try {
    let options = {
      scriptPath: "./node-python",
      args: [Id_path],
    };

    PythonShell.run("createQrCode.py", options, async function (err, res) {
      if (err) console.log(err);
      if (res) {
        let qrcode_path = "../qrcodes/";
        console.log("createQrCode.py finished");
        let pool = await sql.connect(config);
        let addqrCode = await pool
          .request()

          .input("qrType", sql.Int, qrType)
          .input("qrcode", sql.VarChar, qrcode_path + res)
          .query("exec dbo.sqAddQrcode @qrType , @qrcode ");
        console.log(addqrCode.recordset[0]);
        let qrcodeId = addqrCode.recordset[0].karekodNo;

        let addQrcodeId = await pool
          .request()
          .input("qrType", sql.Int, qrType)
          .input("qrcodeId", sql.Int, qrcodeId)
          .input("Id", sql.Int, Id)
          .query("exec spaddTableQrcode @qrcodeId,@qrType,@Id");

        console.log(addQrcodeId.recordset);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createQr: createQr,
};
