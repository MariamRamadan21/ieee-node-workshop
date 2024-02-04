const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/books', (req, res) => {
    fs.readFile('book.json', 'utf8', (err, data) => {
        const books = JSON.parse(data);
        res.json(books);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
