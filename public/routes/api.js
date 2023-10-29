const api = require('express').Router();
const path = require('path');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers');

api.get('/notes', (req, res) => {
    console.log('api get notes');
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

api.post('/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: req.body.id,
    };
    console.log(newNote);

    const pathName = path.join(__dirname, '../db/db.json');

    readAndAppend(newNote, pathName);

    res.json(newNote);
    res.end();
});

api.delete('/notes/:id', (req, res) => {
    console.log('api delete notes');
    const id = req.params.id;
    console.log("id for clicked element: " + id);
    const pathName = path.join(__dirname, '../db/db.json');
    let notes = -1;
    readFromFile(pathName).then((data) => {
        notes = JSON.parse(data);
        console.log(notes);
        const newNoteArray = notes.filter(note => note.id != id);
        console.log(newNoteArray);
        writeToFile(pathName, newNoteArray);
        res.end();
    });
    //console.log(notes);
    //const noteArray = JSON.parse(notes);
    //console.log(noteArray);
    //console.log(notes);
    //console.log(notes.length);
    //const newNoteArray = notes.filter(note => note.id != id);
    //console.log(newNoteArray);
    //writeToFile(pathName, newNoteArray);
    //res.json(newNoteArray);
    res.end();
    //res.sendFile(path.join(__dirname, './public/notes.html'));
});
module.exports = api;