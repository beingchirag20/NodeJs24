const express = require("express");
const app = express();
const PORT = 8000;
const user = require("./MOCK_DATA.json");
const fs = require("fs");
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/api/users", (req, res) => {
  res.json(user);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const get_users = user.find((user) => user.id === id);
    return res.json(get_users);
  })

  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    fs.readFile("./MOCK_DATA.json", "utf-8", (err, data) => {
      if (err) {
        return res.json("Error Reading File")
      }
      const get_users = user.findIndex((user) => user.id === id);

      user[get_users] = { ...user[get_users], ...body };

      fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err, data) => {
        return res.json({ status: "Successfully edited" });
      });
    });
  })

  .delete((req, res) => {
    const id = Number(req.params.id);
    const get_users = user.findIndex((user) => user.id === id);
    if(get_users != 1){
        user.splice(get_users, 1);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(user), (err) => {
          if (err) {
            return res.json({ status: 'Error writing file' });
          }
          return res.json({ status: 'Successfully deleted' });
        });
      }
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  user.push({ ...body, id: user.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err, data) => {
    return res.json({ status: "success", id: user.length });
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on localhost:${PORT}`);
});
