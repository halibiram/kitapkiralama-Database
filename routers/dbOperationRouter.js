const getBooks = require("../dboperations/getBooks");
const getLastAddBook = require("../dboperations/getLastAddBook");
const getBook = require("../dboperations/getBook");
const postAddBook = require("../dboperations/postAddBook");
const addBookforQRcode = require("../dboperations/addBookforQrcode");
const getSearch = require("../dboperations/getSearch");
const login = require("../dboperations/login");
const register = require("../dboperations/register");
const postMyBook = require("../dboperations/postMyBook");

module.exports = {
  getBooks: getBooks.getBooks,
  getLastAddBook: getLastAddBook.getLastAddBook,
  getBook: getBook.getBook,
  postAddBook: postAddBook.postAddBook,
  addBookforQRcode: addBookforQRcode.addBookforQRcode,
  getSearch: getSearch.getSearch,
  login: login.login,
  register: register.register,
  postMyBook: postMyBook.postMyBook,
};
