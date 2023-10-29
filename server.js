const express = require('express');
const fs = require('fs');
const path = require('path');

const apiRouter = require('./public/routes/apiRoutes');
const htmlRouter = require('./public/routes/htmlRoutes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/html', htmlRouter);

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'routes', 'index.html'));
});

app.get('/html', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'routes', 'index.html'));
});

app.get('/notes', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'routes', 'notes.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`);
});