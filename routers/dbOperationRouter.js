const getBooks = require("../dboperations/getBooks");
const getLastAddBook = require("../dboperations/getLastAddBook");
const getBook = require("../dboperations/getBook");
const postAddBook = require("../dboperations/postAddBook");
const addBookforQRcode = require("../dboperations/addBookforQrcode");

module.exports = {
  getBooks: getBooks.getBooks,
  getLastAddBook: getLastAddBook.getLastAddBook,
  getBook: getBook.getBook,
  postAddBook: postAddBook.postAddBook,
  addBookforQRcode: addBookforQRcode.addBookforQRcode,
};
