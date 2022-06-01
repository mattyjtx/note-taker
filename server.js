const express = require('express');
const fs = require('fs');
const path = require('path');
const { uuid } = require('uuidv4');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//HTML GET ROUTES

// GET Route for index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);
// GET Route for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);


// ROUTES FOR ALL NOTES

// get route
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parsedData = JSON.parse(data);
        res.json(parsedData);
    });
    
});
//post route
app.post('/api/notes', (req, res) => {
    fs.readFile("db/db.json", 'utf-8', (err, data) => {
        if (err) throw err;
        const parsedData = JSON.parse(data);
        const {title, text} = req.body;

        const newNote = {title, text, id: uuid() };
        parsedData.push(newNote);
        fs.writeFile("db/db.json", JSON.stringify(parsedData), (err) => {
            if (err) throw err;
            res.json(parsedData);
        })
       
    } );
    
});


// DELETE route: DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. 
app.delete('/api/notes/:id', (req, res) => {
    // To delete a note: read all notes from db.json
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        // remove note with given id property
        const parsedData = JSON.parse(data);
        const deletedNote = req.params.id;
        const test = parsedData.filter(data => data.id !== deletedNote);
        // rewrite notes to db.json
        fs.writeFile('./db/db.json', JSON.stringify(test), (err, data) => {
            if (err) throw err;
            res.json(test);
        })
    });
});

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));