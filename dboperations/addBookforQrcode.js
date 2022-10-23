var config = require("../dbconfig");
const sql = require("mssql");
const runPython = require("../node-python/runPython");
const getLastQrcode = require("./getLastQrcode");

async function addBookforQRcode(bookId) {
  try {
    let addQrcode = await runPython.createQr(
      "http://localhost:8090/api/books/" + bookId,
      bookId,
      3
    );

    // let qrcodeId =await getLastQrcode.getlastqQrcode();
    // console.log(qrcodeId)
    // let pool = await sql.connect(config);
    // let addqrCodeBook = await pool.request()
    // .input('bookId',sql.Int,bookId)
    // .input('qrcodeId',sql.Int,qrcodeId)
    // .query("update kitaplar set karekodNo = @qrcodeId where kitapno = @bookId");
    // //console.log(addqrCodeBook)
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addBookforQRcode: addBookforQRcode,
};
