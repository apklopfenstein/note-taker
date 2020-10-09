const router = require('express').Router();
const { filterByQuery, findById, createNewNote, validateNote, deleteNote } = require('../../lib/notes');
let notes = require('../../db/db');

// Get notes
router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Get notes by ID
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// Send notes and validate
router.post('/notes', (req, res) => {
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// Delete notes route
router.delete('/notes/:id', (req, res) => {
    notes = deleteNote(req.params.id, notes);
    res.json(notes);
});

module.exports = router;