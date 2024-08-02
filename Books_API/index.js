const book = require("./MOCK_DATA.json");
const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.urlencoded({ extended: false }));
PORT = 3000;

//Routing
app.get("/api/books", (req, res) => {
  res.json(book);
});

app
  .route("/api/books/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const get_books = book.find((book) => book.id === id);
    return res.json(get_books);
  })

  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    fs.readFile("./MOCK_DATA.json", "utf-8", (err, data) => {
      if (err) {
        return res.json("Error Reading File");
      }
      const get_books = book.findIndex((book) => book.id === id);

      book[get_books] = { ...book[get_books], ...body };

      fs.writeFile("./MOCK_DATA.json", JSON.stringify(book), (err, data) => {
        return res.json({ status: "Successfully edited" });
      });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const get_books = book.findIndex((book) => book.id === id);
    if(get_books != -1){
        book.splice(get_books, 1);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(book), (err) => {
           if (err)
           {
            return res.json({ status: "Error Deleting File" });
           }
           return res.json({ status: "Successfully deleted" });
        });
    }
  });

  app.post('/api/books', (req,res) => {
    const body = req.body;
    book.push({...body, id: book.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(book), (err, data) => {
        if (err) {
            return res.json({ status: "Error Writing File" });
            }
        return res.json({ status: "Successfully added" });
    });
  });

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
