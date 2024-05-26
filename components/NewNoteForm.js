import { NotesAPI } from "../NotesAPI.js";
import { NoteItem } from "./NoteItem.js";

export class NewNoteForm extends HTMLElement {
    constructor() {
        super();

        this.newNoteTitle = "Add new note";
        this.editTitle = "Edit";
        this.cancelButtonText = "Cancel";
        this.addButtonText = "Add";
        this.isButtonVisible = true;

        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.addNote = this.addNote.bind(this);
    }

    connectedCallback() {
        this.createForm();
    }

    createForm() {
        const form = document.createElement("div");
        form.classList.add("new-note-form");

        const header = document.createElement("div");
        header.classList.add("new-note-header");
        header.innerHTML = `
            <div class='new-note-title'>
                ${this.newNoteTitle}
            </div>`;

        const cancelButton = document.createElement("button");
        cancelButton.classList.add("cancel-button");
        cancelButton.textContent = `${this.cancelButtonText}`;
        cancelButton.addEventListener("click", this.closeForm);

        header.appendChild(cancelButton);

        const formContent = document.createElement("div");
        formContent.classList.add("form-content");

        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.classList.add("title-input");
        titleInput.setAttribute("placeholder", "Untitled Note");

        const textInput = document.createElement("textarea");
        textInput.classList.add("text-input");
        textInput.setAttribute("placeholder", "Enter note text...");

        const addButton = document.createElement("button");
        addButton.textContent = "Add";
        addButton.classList.add("add-button");
        addButton.addEventListener("click", this.addNote);

        // textInput.addEventListener("focusin", () => {
        //     if (textInput.textLength > 0) addButton.style.display = "block";
        // });

        textInput.addEventListener("keyup", () => {
            if (textInput.textLength > 0) {
                addButton.style.display = "block";
            } else {
                addButton.style.display = "none";
            }
        });

        textInput.addEventListener("focusout", () => {
            !textInput.value
                ? (addButton.style.display = "none")
                : (addButton.style.display = "block");
        });

        [header, titleInput, textInput, addButton].forEach((el) =>
            formContent.appendChild(el)
        );
        form.appendChild(formContent);
        this.appendChild(form);
    }

    openForm(id, title, text, isEdit = false) {
        const form = this.querySelector(".new-note-form");
        form.style.display = "block";
        this.querySelector(".new-note-title").textContent = this.newNoteTitle;
        this.isEdit = isEdit;

        if (isEdit) {
            this.querySelector(".title-input").value = title;
            this.querySelector(".text-input").value = text;
            this.querySelector(".new-note-title").textContent = this.editTitle;
            this.noteId = id;
        }
        this.toggleShowAddButton();
    }

    closeForm() {
        const form = this.querySelector(".new-note-form");
        form.style.display = "none";
        this.querySelector(".title-input").value = "";
        this.querySelector(".text-input").value = "";
        this.toggleShowAddButton();
    }

    addNote() {
        const title = this.querySelector(".title-input").value.trim();
        const text = this.querySelector(".text-input").value.trim();
        const date = this.createDate(new Date());

        if (text !== "") {
            const id = this.isEdit
                ? this.noteId
                : Math.floor(Math.random() * 1000000);
            const noteList = document.querySelector("note-list");

            if (title === "") title = "Untitled note";
            const noteItem = new NoteItem(id, title, text, date);

            if (this.isEdit) {
                noteList.querySelector(`[data-id='${this.noteId}']`).remove();
                NotesAPI.editNoteById(this.noteId, title, text, date);
            } else {
                NotesAPI.saveNote(noteItem);
            }

            noteList.prepend(noteItem);
            this.closeForm();
        }

        document.querySelector("add-note-button").style.display = "block";
        if (document.querySelector(".empty-view")) {
            document.querySelector(".empty-view").remove();
        }
    }

    toggleShowAddButton() {
        const newNoteButton = document.querySelector(".add-note-button");
        if (this.isButtonVisible) {
            newNoteButton.style.display = "none";
            this.isButtonVisible = false;
        } else {
            newNoteButton.style.display = "block";
            this.isButtonVisible = true;
        }
    }

    createDate(date) {
        const day = date.getDate();
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        return `${months[date.getMonth()]} ${day}`;
    }
}

customElements.define("new-note-form", NewNoteForm);
