export class EmptyView extends HTMLElement {
    constructor() {
        super();

        this.title = "No notes yet";
        this.info = "Add a note to keep track of your learnings";
        this.buttonText = "Add Note";
    }

    connectedCallback() {
        this.classList.add("empty-view");
        this.createView();
    }

    createView() {
        const wrapper = document.createElement("div");
        wrapper.classList.add("empty-wrapper-content");

        wrapper.innerHTML = `
            <div class='icon'></div>
            <div class='title'>${this.title}</div>
            <div class='info'>${this.info}</div>
        `;

        const addNoteButton = document.createElement("div");
        addNoteButton.classList.add("empty-add-button");
        addNoteButton.innerHTML = `
            <div class='empty-add-icon'></div> ${this.buttonText}
        `;

        addNoteButton.addEventListener("click", () => {
            const form = document.querySelector("new-note-form");
            form.openForm();
        });

        [wrapper, addNoteButton].forEach((el) => this.appendChild(el));

        document.querySelector("add-note-button").style.display = "none";
    }
}

customElements.define("empty-view", EmptyView);
