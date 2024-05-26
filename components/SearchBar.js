export class SearchBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.createSearchBar();
        this.classList.add("search-bar");
    }

    createSearchBar() {
        const searchBarWrapper = document.createElement("div");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Search notes...`;
        input.addEventListener("input", this.handleSearch.bind(this));

        const icon = document.createElement("div");
        icon.innerHTML = `<div class="search-icon"></div>`;

        [icon, input].forEach((el) => {
            searchBarWrapper.appendChild(el);
        });

        this.appendChild(searchBarWrapper);
    }

    handleSearch(event) {
        const query = event.target.value.trim().toLowerCase();
        const notes = document.querySelectorAll("note-item");

        notes.forEach((note) => {
            const title = note
                .querySelector(".note-item-title")
                .textContent.toLowerCase();
            const text = note
                .querySelector(".note-item-body")
                .textContent.toLowerCase();
            if (title.includes(query) || text.includes(query)) {
                note.style.display = "block";
            } else {
                note.style.display = "none";
            }
        });
    }
}

customElements.define("search-bar", SearchBar);
