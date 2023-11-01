const path = require('path');
const fs = require('fs');
//used to create a unique id, need to run 'npm install uuid' in terminal
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    app.post('/api/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);
        res.json(db);
        let note = {
          title: req.body.title,
          text: req.body.text,
          id: uuidv4(),
        };
        db.push(note);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db);
    });    
};