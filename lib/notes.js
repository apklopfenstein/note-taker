const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

function filterByQuery(query, notes) {
    let filteredResults = notes;
    if(query.title) {
        filteredResults = filteredResults.filter(
            (note) => note.title === query.title
        );
    }
    if (query.id) {
        filteredResults = filteredResults.filter(
            (note) => note.id === query.id
        );
    }
    return filteredResults;
}

function findById(id, notes) {
    const result = notes.filter((note) => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    note.id = uuid();
    notesArray.push(note);
    saveNotes(notesArray);
    return note;
}

function saveNotes(notesArray) {
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
};