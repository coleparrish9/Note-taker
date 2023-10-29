const express = require("express");
const fs = require("fs");
const app = express();
const uuid = require("uuid");
const path = require("path");
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));


app.use(express.json());




app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/routes/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/routes/notes.html"));
});

app.get("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const currentNotes = fs.readFileSync("./db/db.json", "utf8");
  let parsedNotes = JSON.parse(currentNotes);
  const { title, text } = req.body;

    const newNote = {
      title,
      text,
      id: uuid.v4(),
    };

    //
    parsedNotes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(parsedNotes));
    res.json(parsedNotes);
  }
);    



app.delete("/api/notes/:id", (req, res) => {
  const currentNotes = fs.readFileSync("./db/db.json", "utf-8");
  let parsedNotes = JSON.parse(currentNotes);
  const noteID = req.params.id;

  const deleteNote = parsedNotes.find((note) => note.id === noteID);
  if (deleteNote) {
    parsedNotes = parsedNotes.filter(note => note.id !== noteID);

  fs.writeFileSync("./db/db.json", JSON.stringify(parsedNotes));
  res.json(parsedNotes);
  }
});  
    
app.listen(PORT, () => {
  console.log(`Server is available on http://localhost:${PORT}`);
});