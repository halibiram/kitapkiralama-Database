//const getBooks = require('./dboperations/getBooks')
const dboperations = require("./routers/dbOperationRouter");

var Books = require("./books");

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const { request, response } = require("express");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);
app.use("/api/bookImages", express.static("bookImages"));

router.use((request, response, next) => {
  console.log("middleware");
  next();
});

router.route("/book").get((request, response) => {
  console.log(request.query.last);
  dboperations.getBooks(request.query.last).then((result) => {
    //console.log(result);
    response.json(result[0]);
  });
});
router.route("/book/:id").get((request, response) => {
  dboperations.getBook(request.params.id).then((result) => {
    //console.log(result);
    response.json(result[0]);
  });
});
router.route("/book").post((request, response) => {
  let book = { ...request.body };

  dboperations.postAddBook(book).then((result) => {
    response.status(201).json(result);
    if (response.statusCode == 201) {
      dboperations.addBookforQRcode(result[0][0].kitapno);
    }
    console.log(result);
  });
});

var port = process.env.Port || 8090;
app.listen(port);
console.log("Order API is running at " + port);
