const express = require('express');

const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './pub/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './pub/notes.html'));
});

app.get('/api/notes', (req, res) => { 
  const notesData = fs.readFileSync('./db/db.json',"utf-8")
  res.json(JSON.parse(notesData))
});

app.post('/api/notes', (req, res) => {
  const notesData = JSON.parse(fs.readFileSync('./db/db.json',"utf-8"))
  console.log("This is my req.body",req.body)
  notesData.push({
    ...req.body,
    id:uuidv4()
  })
  fs.writeFileSync('./db/db.json',JSON.stringify(notesData))
  res.json({message:'Notes Saved'});
});

app.delete('/api/notes/:id', (req, res) => {
  const notesData = JSON.parse(fs.readFileSync('./db/db.json',"utf-8"))
  const filteredNotes = notesData.filter(note => note.id !== req.params.id)
  fs.writeFileSync('./db/db.json',JSON.stringify(filteredNotes))
  res.json({message:'Note Deleted'});
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});