let notes = JSON.parse(localStorage.getItem("notes")) || [];

displayNotes();

function openApp() {
    document.getElementById("welcomePage").style.display = "none";
    document.getElementById("appPage").style.display = "block";
}

function addNote() {
    let title = document.getElementById("title").value.trim();
    let description = document.getElementById("description").value.trim();
    let category = document.getElementById("category").value;
    let color = document.getElementById("noteColor").value;
    let textColor = document.getElementById("textColor").value;

    if (title === "" || description === "") {
        alert("Please fill all fields");
        return;
    }

    let note = {
        id: Date.now(),
        title: title,
        description: description,
        category: category,
        color: color,
        textColor: textColor,
        date: new Date().toLocaleString(),
        pinned: false
    };

    notes.push(note);

    saveNotes();

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    displayNotes();
}

function displayNotes() {
    let container = document.getElementById("notesContainer");

    container.innerHTML = "";

    notes.sort((a, b) => b.pinned - a.pinned);

    notes.forEach(note => {
        container.innerHTML += `
        <div class="note" style="background:${note.color}">
            <h3>
                ${note.pinned ? "📌 " : ""}
                ${note.title}
            </h3>

            <p><strong>Category:</strong> ${note.category}</p>

            <p style="color:${note.textColor}">
                ${note.description}
            </p>

            <small>📅 ${note.date}</small>

            <br><br>

            <button onclick="editNote(${note.id})">
                ✏ Edit
            </button>

            <button onclick="deleteNote(${note.id})">
                🗑 Delete
            </button>

            <button onclick="pinNote(${note.id})">
                ${note.pinned ? "📌 Unpin" : "📌 Pin"}
            </button>
        </div>
        `;
    });
}

function editNote(id) {
    let note = notes.find(note => note.id === id);

    let newTitle = prompt("Edit Title", note.title);
    if (newTitle === null) return;

    let newDescription = prompt("Edit Description", note.description);
    if (newDescription === null) return;

    note.title = newTitle;
    note.description = newDescription;

    saveNotes();
    displayNotes();
}

function deleteNote(id) {
    if (!confirm("Are you sure you want to delete this note?")) {
        return;
    }

    notes = notes.filter(note => note.id !== id);

    saveNotes();
    displayNotes();
}

function pinNote(id) {
    let note = notes.find(note => note.id === id);

    note.pinned = !note.pinned;

    saveNotes();
    displayNotes();
}

function searchNotes() {
    let search = document
        .getElementById("search")
        .value
        .toLowerCase();

    let filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search) ||
        note.description.toLowerCase().includes(search) ||
        note.category.toLowerCase().includes(search)
    );

    let container = document.getElementById("notesContainer");

    container.innerHTML = "";

    filteredNotes.forEach(note => {
        container.innerHTML += `
        <div class="note" style="background:${note.color}">
            <h3>
                ${note.pinned ? "📌 " : ""}
                ${note.title}
            </h3>

            <p><strong>Category:</strong> ${note.category}</p>

            <p style="color:${note.textColor}">
                ${note.description}
            </p>

            <small>📅 ${note.date}</small>

            <br><br>

            <button onclick="editNote(${note.id})">
                ✏ Edit
            </button>

            <button onclick="deleteNote(${note.id})">
                🗑 Delete
            </button>

            <button onclick="pinNote(${note.id})">
                ${note.pinned ? "📌 Unpin" : "📌 Pin"}
            </button>
        </div>
        `;
    });
}

function saveNotes() {
    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
