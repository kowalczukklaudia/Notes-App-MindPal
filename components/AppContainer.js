import { SearchBar } from "./SearchBar.js";
import { AddNoteButton } from "./AddNoteButton.js";
import { NoteList } from "./NoteList.js";
import { Modal } from "./Modal.js";
import { NewNoteForm } from "./NewNoteForm.js";

export class AppContainer extends HTMLElement {
    constructor() {
        super();

        this._searchBar = new SearchBar();
        this._addNoteButton = new AddNoteButton();
        this._noteList = new NoteList("note-list");
        this._modal = new Modal();
        this._newNoteForm = new NewNoteForm();
    }

    connectedCallback() {
        this.createMainAppView();
    }

    createMainAppView() {
        const header = this.createHeader("Notes");
        const container = document.createElement("div");
        container.classList.add("container");

        [
            header,
            this._searchBar,
            this._addNoteButton,
            this._modal,
            this._newNoteForm,
            this._noteList,
        ].forEach((el) => container.appendChild(el));

        this.appendChild(container);
    }

    createHeader(title) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("header-wrapper");

        const titleElement = document.createElement("h1");
        titleElement.textContent = title;
        titleElement.classList.add("header");

        const noteIcon = document.createElement("div");
        noteIcon.classList.add("note-icon");

        [noteIcon, titleElement].forEach((el) => {
            wrapper.appendChild(el);
        });

        return wrapper;
    }
}

customElements.define("app-container", AppContainer);
