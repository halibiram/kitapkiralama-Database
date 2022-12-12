//const getBooks = require('./dboperations/getBooks')
const dboperations = require("./routers/dbOperationRouter");

var Books = require("./books");

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const { request, response } = require("express");
const dbOperationRouter = require("./routers/dbOperationRouter");
const res = require("express/lib/response");
const { route } = require("express/lib/application");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);
app.use("/api/bookImages", express.static("bookImages"));
app.use("/qrcodes", express.static("qrcodes"));

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
router.route("/bookcase").get((req, res) => {
  dboperations.getBookcase().then((result) => {
    res.json(result[0]);
  });
});
router.route("/").get((request, response) => {
  console.log("gelen sorgu " + request.query.search);
  dboperations.getSearch(request.query.search).then((result) => {
    //console.log(result);
    response.json(result[0]);
  });
});
router.route("/books/:id").get((request, response) => {
  dboperations.getBook(request.params.id).then((result) => {
    console.log(request);
    response.json(result[0]);
  });
});
router.route("/books/").get((request, response) => {
  dboperations.getBookLocation(request.query).then((result) => {
    console.log(request.query);
    response.json(result[0]);
  });
});
router.route("/qrcode").get((request, response) => {
  dboperations.getQrcode(request.query).then((result) => {
    try {
      response.json(result[0]);
    } catch {}
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
router.route("/rentbook").post((req, res) => {
  const data = { ...req.body };
  console.log(data);
  dboperations.postRentBook(data).then((result) => {
    console.log(result[0][0]);
    res.status(201).json(result[0]);
  });
});
router.route("/rentbook").patch((request, response) => {
  const data = { ...request.body };
  console.log(data);
  dboperations.patchDeliverBook(data).then((result) => {
    console.log(result);
    response.status(200).json(result);
  });
});
router.route("/rentbook/check").patch((request, response) => {
  const data = { ...request.body };
  console.log(data);
  dboperations.patchCheckBookcase(data).then((result) => {
    console.log(result);
    response.status(200).json(result);
  });
});

router.route("/book/fav").post((req, res) => {
  const data = { ...req.body };
  console.log(data);
  dboperations.postAddFavBook(data).then((result) => {
    console.log(result);
    res.status(201).json(result);
  });
});
router.route("/book/fav").delete((request, response) => {
  const data = { ...request.headers };
  console.log(data);
  dboperations.deleteFavBook(data).then((result) => {
    response.status(200).json(result[0]);
  });
});

router.route("/category").get((req, res) => {
  if (req.query.id) {
    console.log(req.query);
    dboperations.getCategoryBook(req.query).then((result) => {
      res.status(200).json(result);
    });
  } else
    dboperations.getCategory().then((result) => {
      res.status(200).json(result[0]);
    });
});

var port = process.env.Port || 8091;
app.listen(port);
console.log("Your API is running at " + port);
