const getBooks = require("../dboperations/getBooks");
const getLastAddBook = require("../dboperations/getLastAddBook");
const getBook = require("../dboperations/getBook");
const getSearch = require("../dboperations/getSearch");
const getBookLocation = require("../dboperations/getBookLocation");
const getBookcase = require("../dboperations/getBookcase");
const getQrcode = require("../dboperations/getQrcode");
const getCategory = require("../dboperations/getCategory");
const getCategoryBook = require("../dboperations/getCategoryBook");

const postAddBook = require("../dboperations/postAddBook");
const addBookforQRcode = require("../dboperations/addBookforQrcode");

const login = require("../dboperations/login");
const register = require("../dboperations/register");

const postMyBook = require("../dboperations/postMyBook");
const postRentBook = require("../dboperations/postRentBook");
const postAddFavBook = require("../dboperations/postAddFavBook");

const patchDeliverBook = require("../dboperations/patchDeliverBook");
const patchCheckBookcase = require("../dboperations/patchCheckBookcase");

const deleteFavBook = require("../dboperations/deleteFavBook");

module.exports = {
  getBooks: getBooks.getBooks,
  getLastAddBook: getLastAddBook.getLastAddBook,
  getBook: getBook.getBook,
  getSearch: getSearch.getSearch,
  getBookLocation: getBookLocation.getBookLocation,
  getBookcase: getBookcase.getBookcase,
  getQrcode: getQrcode.getQrcode,
  getCategory: getCategory.getCategory,
  getCategoryBook: getCategoryBook.getCategoryBook,

  postAddBook: postAddBook.postAddBook,
  addBookforQRcode: addBookforQRcode.addBookforQRcode,

  login: login.login,
  register: register.register,

  postMyBook: postMyBook.postMyBook,
  postRentBook: postRentBook.postRentBook,
  postAddFavBook: postAddFavBook.postAddFavBook,

  patchDeliverBook: patchDeliverBook.patchDeliverBook,
  patchCheckBookcase: patchCheckBookcase.patchCheckBookcase,

  deleteFavBook: deleteFavBook.deleteFavBook,
};
