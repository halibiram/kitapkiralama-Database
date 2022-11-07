const { PythonShell } = require("python-shell");
var config = require("../dbconfig");
const sql = require("mssql");

const dboperations = require("../routers/dbOperationRouter");

const bookInfo = {};

function webScraing(info) {
  const options = {
    scriptPath: "./node-python",
    encoding: "utf8",
    args: [info],
  };
  PythonShell.run(
    "kutuphaneWebScraping.py",
    options,
    async function (err, res) {
      if (err) {
        console.log("Hatali olustu, diger linke geciliyor");
        webScraing(info + 1);
      }

      if (res) {
        console.log(res.length);
        for (i = 0; i < res.length; i = i + 2) {
          bookInfo[res[i]] = res[i + 1];
        }

        console.log(bookInfo);
        // const add_author = await addAuthor(bookInfo.yazar).then(await function(res) {authorId=res[0].yazarno});
        // const add_category=await addCategory(bookInfo.konular).then(await function(res) {categoryIds=res});
        // const add_publisherName =await addPublisher(bookInfo.yayinlayan).then(await function(result) {
        //     PublisherId=result[0].yayineviNo;

        // })

        try {
          await addBook(bookInfo, info);
        } catch (error) {
          console.log(error);
          webScraing(info + 1);
        }
      }
    }
  );
}
async function addBook(bookInfo, info) {
  const add_author = await addAuthor(bookInfo.yazar).then(
    await function (res) {
      authorId = res[0].yazarno;
    }
  );
  const add_category = await addCategory(bookInfo.konular).then(
    await function (res) {
      categoryIds = res;
    }
  );
  const add_publisherName = await addPublisher(bookInfo.yayinlayan).then(
    await function (result) {
      PublisherId = result[0].yayineviNo;
    }
  );
  const lastaddBooks = [];
  function delayAFn(ms) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, ms)
    );
  }
  try {
    console.log(categoryIds.length);

    const pool = await sql.connect(config);

    //await delayAFn(2000);
    console.log("2 second resume");

    const insertBook = await pool
      .request()
      .input("kitapAdi", sql.NVarChar, bookInfo.eser_adi)
      .input("yazarNo", sql.Int, authorId)
      .input("yayineviNo", sql.Int, PublisherId)
      .input("yayinTarihi", sql.Date, bookInfo.yayin_tarihi)

      .input("kapakResmi", sql.NVarChar, bookInfo.image_path)
      .input("stok", sql.Int, 150)
      .query(
        "insert into kitaplar(adi,yazarno,yayinTarihi,yayinevino,kapakresmi,stok) values(@kitapAdi,@yazarNo,@yayinTarihi,@yayineviNo,@kapakresmi,@stok)"
      );
    const lastaddBook = await pool
      .request()
      .query("select top(1) kitapNo from kitaplar order by kitapNo desc");
    console.log(lastaddBook.recordset);
    console.log(categoryIds);
    const lastbook = lastaddBook.recordset;
    let insertbookCategory;
    for (i = 0; i <= categoryIds.length - 1; i++) {
      insertbookCategory = await pool
        .request()
        .input("kitapNo", sql.Int, lastbook[0].kitapNo)
        .input("kategoriNo", sql.Int, categoryIds[i][0].kategoriNo)
        .query("spKitapKategorisiEkle @kitapNo, @kategoriNo");
    }
    console.log(insertbookCategory.recordsets);
    dboperations
      .addBookforQRcode(lastbook[0].kitapNo)
      .then(async function (res) {
        await delayAFn(1000);

        webScraing(info + 1);
      })
      .catch((rej) => webScraing(info + 1));
  } catch (error) {
    console.log(error);
  }
}
async function addAuthor(authorName) {
  try {
    const author = authorName.split(",");
    const pool = await sql.connect(config);
    const insertBook = await pool
      .request()
      .input("name", sql.NVarChar, author[1])
      .input("surname", sql.NVarChar, author[0])
      .query("exec spAddAuthor @name , @surname");

    return await insertBook.recordset;
  } catch (error) {
    console.log(error);
  }
}
async function addCategory(categoryName) {
  try {
    const categoryIds = [];
    const category = categoryName.split("--");
    const pool = await sql.connect(config);

    for (num = 0; num < category.length; num++) {
      const insertCategory = await pool
        .request()
        .input("categoryName", sql.NVarChar, category[num])
        .query("exec spAddCategory @categoryName");
      categoryIds.push(insertCategory.recordset);
    }

    return await categoryIds;
  } catch (err) {
    console.log(err);
  }
}
async function addPublisher(publisherName) {
  try {
    const pool = await sql.connect(config);
    const insertPublisher = await pool
      .request()
      .input("publisherName", sql.NVarChar, publisherName)
      .query("exec spAddPublisher @publisherName");
    return await insertPublisher.recordset;
  } catch (error) {
    console.log(error);
  }
}

webScraing(300);
