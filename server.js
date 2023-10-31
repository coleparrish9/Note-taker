
const express = require('express');
const htmlRoutes = require('./public/routes/htmlRoutes');
const apiRoutes = require('./public/routes/apiRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
    );