import { NotesAPI } from "../NotesAPI.js";
import { _AppContainer } from "../app.js";
import { EmptyView } from "./EmptyView.js";

export class Modal extends HTMLElement {
    constructor() {
        super();
        this.modalTitle = "Delete Note";
        this.cancelButtonText = "Cancel";
        this.deleteButtonText = "Delete";
        this.modalText = "Are you sure you want to delete this note?";

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    connectedCallback() {
        this.createModal();
    }

    openModal(id) {
        const modal = this.querySelector(".modal-dialog");
        modal.style.display = "flex";
        modal.classList.add("modal-open");
        this.noteId = id;

        const appContainer = document.querySelector(".container");
        appContainer.classList.add("no-scroll");
    }

    closeModal() {
        const modal = this.querySelector(".modal-dialog");
        modal.style.display = "none";
        modal.classList.remove("modal-open");

        const appContainer = document.querySelector(".container");
        appContainer.classList.remove("no-scroll");
    }

    deleteNote() {
        NotesAPI.deleteNote(this.noteId);
        document.querySelector(`[data-id='${this.noteId}']`).remove();
        this.closeModal();

        this.checkNotes();
    }

    createModal() {
        const modal = document.createElement("div");
        modal.classList.add("modal-dialog");

        const header = document.createElement("div");
        header.classList.add("modal-header");
        header.innerHTML = `
            <div class='modal-title'>
                ${this.modalTitle}
            </div>`;

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        const text = document.createElement("div");
        text.classList.add("modal-text");
        text.textContent = this.modalText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = `${this.deleteButtonText}`;
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", this.deleteNote);

        const cancelButton = document.createElement("button");
        cancelButton.classList.add("cancel-modal-button");
        cancelButton.textContent = `${this.cancelButtonText}`;
        cancelButton.addEventListener("click", this.closeModal);

        const buttonWrapper = document.createElement("div");
        buttonWrapper.classList.add("modal-button-wrapper");
        [cancelButton, deleteButton].forEach((el) =>
            buttonWrapper.appendChild(el)
        );

        [header, text, buttonWrapper].forEach((el) =>
            modalContent.appendChild(el)
        );

        modal.appendChild(modalContent);
        this.appendChild(modal);
    }

    checkNotes() {
        const isListEmpty = !document.querySelector("note-item");

        if (isListEmpty) {
            const emptyView = new EmptyView();
            document.querySelector(".note-list").appendChild(emptyView);
            document.querySelector(".add-note-button").style.display = "none";
        }
    }
}

customElements.define("modal-dialog", Modal);
