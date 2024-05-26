export class NoteItem extends HTMLElement {
    constructor(id, title, text, date) {
        super();

        this._id = id;
        this._title = title;
        this._text = text;
        this._date = date;
        this._editNoteClickHandler;
        this._deleteNoteClickHandler;

        this.createHandlers();
    }

    connectedCallback() {
        this.setAttribute("data-id", this._id);
        this.createNoteItem();
    }

    createNoteItem() {
        const MAX_TITLE_LENGTH = 20;

        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note-item");

        const titleWrapper = document.createElement("div");
        titleWrapper.classList.add("note-item-title-wrapper");

        const titleElement = document.createElement("p");
        titleElement.textContent = `
            ${this._title.substring(0, MAX_TITLE_LENGTH)}${
            this._title.length > MAX_TITLE_LENGTH ? "..." : ""
        }
        `;
        titleElement.classList.add("note-item-title");

        const buttonWrapper = document.createElement("div");
        buttonWrapper.classList.add("note-item-buttons-wrapper");

        const textElement = document.createElement("p");
        textElement.classList.add("note-item-body");
        textElement.textContent = this._text;

        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", this._editNoteClickHandler);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", this._deleteNoteClickHandler);

        const footer = document.createElement("p");
        footer.classList.add("date-item-footer");
        footer.textContent = this._date;

        [editButton, deleteButton].forEach((el) => {
            buttonWrapper.appendChild(el);
        });

        [titleElement, buttonWrapper].forEach((el) => {
            titleWrapper.appendChild(el);
        });

        [titleWrapper, textElement, footer].forEach((el) =>
            noteDiv.appendChild(el)
        );

        this.appendChild(noteDiv);
    }

    createHandlers() {
        this._editNoteClickHandler = (ev) => {
            const form = document.querySelector("new-note-form");
            form.openForm(this._id, this._title, this._text, true);
        };

        this._deleteNoteClickHandler = (ev) => {
            const modal = document.querySelector("modal-dialog");
            modal.openModal(this._id);
        };
    }
}

customElements.define("note-item", NoteItem);
