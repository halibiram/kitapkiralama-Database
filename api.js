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
router.route("/").get((request, response) => {
  console.log("gelen sorgu " + request.query.search);
  dboperations.getSearch(request.query.search).then((result) => {
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
router.route("/login").post((request, response) => {
  const user = { ...request.body };
  dboperations.login(user).then((result) => {
    console.log(result[0][0]);
    if (result[0][0].statusCode == 404) {
      response
        .status(404)

        // .json({ status: 404 })
        .send({ error: "Eposta veya kullanici adi hatali!" });
    } else if (result[0][0].statusCode == 401) {
      response.status(401).json({ error: "Girilen sifre hatali" });
    } else if (result[0][0].statusCode == 200) {
      response.status(200).json(result[0][0]);
    }
  });
});
router.route("/register").post((request, response) => {
  const newuser = { ...request.body };
  console.log(newuser);
  dboperations.register(newuser).then((result) => {
    console.log(result);
    response.status(200).json(result[0][0]);
  });
});
router.route("/mybook").post((request, response) => {
  const data = { ...request.body };
  console.log(data);
  dboperations.postMyBook(data).then((result) => {
    console.log(result);
    response.status(200).json(result[0]);
  });
});

var port = process.env.Port || 8091;
app.listen(port);
console.log("Your API is running at " + port);
