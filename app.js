//start alert
console.log('starting app.js');
//modules
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
//end modules

//command line rules
const titleOptions = {
  describe: 'Title of note.',
  demand: true,
  alias: 't'
};
const argv = yargs
//command, description, object
  .command('add', 'Adds a note.', {
      title: titleOptions,
    body: {
      describe: 'Body of note.',
      demand: true,
      alias: 'b'
    }

  })
  .command('list', 'List all notes.')
  .command('read', 'Read a note', {
      title: titleOptions,
  })
  .command('remove', 'Remove a note.', {
      title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];


//Logic begins

//adding task
if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('note created');
    notes.logNote(note);
  } else {
    console.log('note title taken');
  }

//listing tasks
} else if (command === 'list') {
  var allNotes = notes.getAll();
console.log(`Printing ${allNotes.length} note(s).`);
allNotes.forEach((note) => notes.logNote(note));
//deleting a task
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found' ;
  console.log(message);
//reading a specific task
} else if (command === 'read'){
  var note = notes.getNote(argv.title);
  if (note){
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note does not exist.');
  }
}

// invalid command check
 else {
  console.log('Command not recognized.');
}
