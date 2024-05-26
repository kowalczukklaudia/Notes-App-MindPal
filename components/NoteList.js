import { NoteItem } from "./NoteItem.js";
import { _AppContainer } from "../app.js";
import { EmptyView } from "./EmptyView.js";

export class NoteList extends HTMLElement {
    constructor() {
        super();
        this.renderNotes = this.renderNotes.bind(this);
        this.emptyListView = new EmptyView();
    }

    connectedCallback() {
        this.classList.add("note-list");
        this.renderNotes();
    }

    renderNotes() {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

        if (savedNotes.length === 0) {
            this.appendChild(this.emptyListView);

            return;
        }

        savedNotes.forEach((note) => {
            const noteItem = new NoteItem(
                note.id,
                note.title,
                note.text,
                note.date
            );
            this.prepend(noteItem);
        });
    }
}

customElements.define("note-list", NoteList);
