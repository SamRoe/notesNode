//file sync verify
console.log('starting notes.js');

const fs = require('fs');

// collecting notes from file
var fetchNotes = () => {
	try {

		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);

	} catch (e) {
		return [];
	}
};

//saving task to file
var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};


//add note
var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
//checking if note exists
	var duplicateNotes = notes.filter((note) => note.title === title);
//if 0 note doesnt exist
	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

var getAll = () => {
	return fetchNotes();
};

var getNote = (title) => {
	var notes = fetchNotes();
	// returns true if note matches and false if it doesnt. Sets it to var.
	var filteredNotes = notes.filter((note) => note.title === title);
	//returns results of test for app.js logic i.e. if/else
	return filteredNotes[0];
};

var removeNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);
	return notes.length !== filteredNotes.length;
};
// refactors code to print note
var logNote = (note) => {
	console.log('---');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
}

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
}
