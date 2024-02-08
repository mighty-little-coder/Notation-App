const router = require('express').Router();
const path = require('path');
const fs = require('fs');

// Read and write functions
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET notes from the db file and return as JSON
router.get('/notes', (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)));
}
);

// POST new note to the db file
router.post('/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`${note.title} note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE note from the db file
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id !== noteId);
      fs.writeFile('./db/db.json', JSON.stringify(result, null, 4), (err) =>
        err ? console.error(err) : console.info(`${note.title} note deleted`)
      );
    });
  res.json('Note deleted');
});


module.exports = router;