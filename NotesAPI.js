export const NotesAPI = {
    getAllNotes() {
        return JSON.parse(localStorage.getItem("notes")) || [];
    },

    getNoteById(id) {
        debugger;
        const allNotes = this.getAllNotes();
        const note = allNotes.filter((note) => note.id === id);

        return note;
    },

    editNoteById(id, title, text, date) {
        const allNotes = this.getAllNotes();
        const noteIndex = allNotes.findIndex((note) => note.id === id);

        if (noteIndex !== -1) {
            allNotes[noteIndex].title = title;
            allNotes[noteIndex].text = text;
            allNotes[noteIndex].date = date;
        }
    },

    saveNote(noteItem) {
        const { id, title, text, date } = this.parseNoteItem(noteItem);
        const allNotes = this.getAllNotes();

        allNotes.push({ id, title, text, date });

        localStorage.setItem("notes", JSON.stringify(allNotes));
    },

    deleteNote(id) {
        const allNotes = this.getAllNotes();
        const updatedNotes = allNotes.filter((note) => note.id !== id);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    },

    parseNoteItem(noteItem) {
        return {
            id: noteItem._id,
            title: noteItem._title,
            text: noteItem._text,
            date: noteItem._date,
        };
    },
};
