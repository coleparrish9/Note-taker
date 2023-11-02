const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
router.get('/notes', (_req, res) => {
    try {
        const notesData = fs.readFileSync(path.join(__dirname, '../../db/db.json'));
        const notes = JSON.parse(notesData);
        res.json(notes);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.post('/notes', (req, res) => {
    try {
        const notesData = fs.readFileSync(path.join(__dirname, '../../db/db.json'));
        const notes = JSON.parse(notesData);
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuid.v4()
        };
        notes.push(newNote);
        fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(notes, null, 2));

        res.json({ msg: 'You added a note!', notes: newNote });
        } catch (err) {
        console.log(err);
    }
}
);
router.delete('/notes/:id', (req, res) => {
    try {
        const notesData = fs.readFileSync(path.join(__dirname, '../../db/db.json'));
        const notes = JSON.parse(notesData);
        const filteredNotes = notes.filter(note => note.id !== req.params.id);
        fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(filteredNotes));
        res.json({ msg: 'You deleted a note!' });
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;