var config = require("../../dbconfig");
const sql = require("mssql");
const runPython = require("../../node-python/runPython");

async function getData() {
  let result;
  try {
    let pool = await sql.connect(config);
    let data = await pool.request().query("select reyonNo from reyonlar");
    result = data.recordset;
  } catch (err) {
    console.log(err);
  }

  result.map(async (item) => await addQrcode(item.dolapNo, 4));
}
getData();

async function addQrcode(id, typeNo) {
  try {
    const add = await runPython.createQr("api/qrcode/" + id, id, typeNo);
  } catch (error) {
    console.log(error);
  }
}
