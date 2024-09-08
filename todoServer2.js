const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

var totalNum = 0;
app.get("/todos", (req, res) => {
  var jsonBody = {};

  fs.readFile("./files/b.json", "utf-8", (err, data) => {
    if (err) {
      return;
    }
    jsonBody = JSON.parse(data);
    res.send(JSON.stringify(jsonBody));
  });
});

app.get("/todos/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var exists = false;
  var jsonBody = {};
  fs.readFile("./files/b.json", "utf-8", (err, data) => {
    if (err) {
      return;
    }
    jsonBody = JSON.parse(data);

    for (var i = 0; i < jsonBody.length; i++) {
      if (jsonBody[i].id == id) {
        exists = true;
        res.json({
          id: jsonBody[i].id,
          title: jsonBody[i].title,
          description: jsonBody[i].description,
          completed: jsonBody[i].completed,
        });
        break;
      }
    }

    if (!exists) {
      res.status(404).send("Not found");
    }
  });
});

app.post("/todos", (req, res) => {
  totalNum++;
  var createdTodoId = totalNum;

  const createdTodo = {
    id: createdTodoId,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };

  fs.readFile("./files/b.json", "utf-8", (err, data) => {
    if (err) {
      return;
    }
    var jsonBody = JSON.parse(data);

    for (var i = 0; i < jsonBody.length; i++) {
      if (jsonBody[i].id == createdTodoId) {
        createdTodo.id += Math.floor(Math.random() * 1000000);
      }
    }

    jsonBody.push(createdTodo);

    fs.writeFile("./files/b.json", JSON.stringify(jsonBody), "utf-8", (err) => {
      if (err) throw err;
      else res.status(201).send(createdTodo);
    });
  });
});

app.put("/todos/:id", (req, res) => {
  var reqId = parseInt(req.params.id);

  var inputBody = req.body;
  var exists = false;
  var jsonBody = {};
  fs.readFile("./files/b.json", "utf-8", (err, data) => {
    if (err) {
      return;
    }
    jsonBody = JSON.parse(data);

    for (var i = 0; i < jsonBody.length; i++) {
      if (jsonBody[i].id === reqId) {
        exists = true;
        jsonBody[i].completed = inputBody.completed;
        break;
      }
    }
    if (!exists) {
      res.status(404).send("Not found");
    } else {
      fs.writeFile(
        "./files/b.json",
        JSON.stringify(jsonBody),
        "utf-8",
        (err) => {
          if (err) throw err;
          res.send("Found and updated");
        }
      );
    }
  });
});

app.delete("/todos/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var exists = false;
  var jsonBody = {};
  fs.readFile("./files/b.json", "utf-8", (err, data) => {
    if (err) {
      return;
    }
    jsonBody = JSON.parse(data);

    for (var i = 0; i < jsonBody.length; i++) {
      if (jsonBody[i].id === id) {
        exists = true;
        jsonBody.splice(i, 1);
        break;
      }
    }

    if (!exists) {
      res.status(404).send("Not found");
    } else {
      fs.writeFile(
        "./files/b.json",
        JSON.stringify(jsonBody),
        "utf-8",
        (err) => {
          if (err) throw err;
          res.send(jsonBody);
        }
      );
    }
  });
});

// app.get('/',(req,res)=>{
//   res.sendFile(path.join(__dirname ,"index.html"))
// })

app.listen(3000, () => {
  console.log("Listening");
});
