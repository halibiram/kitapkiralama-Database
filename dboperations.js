var config = require("./dbconfig");
const sql = require("mssql");
const runPython = require("./node-python/runPython");

async function getBooks() {
  try {
    let pool = await sql.connect(config);

    let products = await pool.request().query("Select * from kitaplar");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function getLastAddBook() {
  try {
    let pool = await sql.connect(config);
    let book = await pool
      .request()
      .query("Select top(1)* from kitaplar order by kitapno desc");

    return book.recordset[0].kitapno;
  } catch (error) {
    console.log(error);
  }
}

async function getBook(bookId) {
  try {
    let pool = await sql.connect(config);
    let products = await pool
      .request()
      .input("input_parameter", sql.Int, bookId)
      .query("Select * from kitaplar where kitapno = @input_parameter");

    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addBook(book) {
  try {
    let pool = await sql.connect(config);
    let insertBook = await pool
      .request()
      .input("kitapAdi", sql.VarChar, book.adi)
      .input("yazarNo", sql.Int, book.yazarno)
      .input("yayineviNo", sql.Int, book.yayinevi)

      .input("dolapNo", sql.Int, book.dolapno)
      .input("kategoriNo", sql.Int, book.kategorino)
      .input("hakkinda", sql.VarChar, book.hakkinda)

      .input("stok", sql.Int, book.stok)
      .input("sayfaSayisi", sql.Int, book.sayfaSayisi)

      .execute("spKitapEkle");
    lastbook = await getLastAddBook();
    console.log(lastbook);

    return insertBook.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBooks: getBooks,
  getBook: getBook,
  addBook: addBook,
};
