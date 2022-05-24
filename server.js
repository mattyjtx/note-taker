const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//create list of routes
// a get route for ALL the notes

// get route
app.get('/api/notes', (req, res) => {
    fs.readFile("./Develop/db/db.json", 'utf-8', (err, data) => {
        if (err) throw err;
        const parsedData = JSON.parse(data);
        res.json(parsedData);
    } );
    
});
//post route
app.post('/api/notes', (req, res) => {
    fs.readFile("./Develop/db/db.json", 'utf-8', (err, data) => {
        if (err) throw err;
        const parsedData = JSON.parse(data);
        const newNote = req.body;
        parsedData.push(newNote);
        fs.writeFile("./Develop/db/db.json", JSON.stringify(parsedData), (err) => {
            if (err) throw err;
            res.json(parsedData);
        })
        // res.json(parsedData);
    } );
    
});

// delete route

// may want to put some of the logic in a seperate function
//getData()
// this function might need to be a promise

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));