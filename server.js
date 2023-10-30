const express = require("express");
const fs = require("fs");
const app = express();
const uuid = require("uuid");
const fs = require('fs');
const uuid = require('uuid');
const path = require('path'); 
const express = require('express'); 
const App = express();
const JSONnotes = require('./db/db.json');

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/routes/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/routes/notes.html'))
});

app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid.v4(),
        };
        JSONnotes.push(newNote);

        fs.writeFileSync('./db/db.json', JSON.stringify(JSONnotes, null, 4));
        res.json(JSONnotes);
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;
    const deleteThisNote = JSONnotes.find((note) => note.id === noteID);
    JSONnotes.splice(deleteThisNote, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(JSONnotes, null, 4));
    res.json(JSONnotes);
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});