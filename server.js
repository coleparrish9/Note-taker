const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
const express = require('express');

const app = express();

const DBnotes = require('./db/db.json');

const PORT = process.env.PORT || 3001;


app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
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

        DBnotes.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(DBnotes, null, 4));
        res.json(DBnotes);
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;
    const deleteThisNote = DBnotes.find((note) => note.id === noteID);

    DBnotes.splice(deleteThisNote, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(DBnotes, null, 4));
    res.json(DBnotes);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});