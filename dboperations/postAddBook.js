var config = require("../dbconfig");
const sql = require("mssql");

async function postAddBook(book) {
  try {
    let pool = await sql.connect(config);
    let insertBook = await pool
      .request()
      .input("kitapAdi", sql.NVarChar, book.adi)
      .input("yazarNo", sql.Int, book.yazarno)
      .input("yayineviNo", sql.Int, book.yayinevi)

      .input("dolapNo", sql.Int, book.dolapno)
      .input("kategoriNo", sql.Int, book.kategorino)
      .input("hakkinda", sql.NVarChar, book.hakkinda)

      .input("stok", sql.Int, book.stok)
      .input("sayfaSayisi", sql.Int, book.sayfaSayisi)

      .execute("spKitapEkle");

    return insertBook.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  postAddBook: postAddBook,
};
