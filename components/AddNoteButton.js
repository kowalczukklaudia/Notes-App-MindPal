export class AddNoteButton extends HTMLElement {
    constructor() {
        super();

        this.buttonText = "Add New";
    }

    connectedCallback() {
        this.createButton();
    }

    createButton() {
        const button = document.createElement("button");
        button.textContent = this.buttonText;
        button.classList.add("add-note-button");
        button.addEventListener("click", () => {
            const form = document.querySelector("new-note-form");
            form.openForm();
            this.style.display = "hidden";
        });
        this.appendChild(button);
    }
}

customElements.define("add-note-button", AddNoteButton);
