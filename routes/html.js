const path = require('path');

module.exports = (pages) => {
    pages.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    pages.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};