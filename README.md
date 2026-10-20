# Simple Diary App (Educational Vanilla JS)

A lightweight, single-page diary application built with plain HTML, CSS, and JavaScript. This project is designed specifically for educational purposes to demonstrate fundamental Web API concepts, state management, and clear CRUD (Create, Read, Update, Delete) architecture using `localStorage`.

Lazily generated with Gemini Auto Low ([https://share.gemini.google/sHYX4tkeGI5S](https://share.gemini.google/sHYX4tkeGI5S)).
---

## 🎯 Educational Goals

This project serves as a clear, minimal example for learning:
- **DOM Manipulation:** Dynamically creating, updating, and removing HTML elements using JavaScript.
- **State Persistence:** Saving and loading data across browser sessions using `localStorage`.
- **CRUD Architecture:** Separating business logic into explicit, standalone handler functions.
- **Form Handling & Handling Edit Mode:** Reusing a single form for both creating and updating records.

---

## 🛠️ Tech Stack

- **HTML5:** Semantic structure and forms.
- **CSS3:** Native styling with CSS Variables for theme management.
- **JavaScript (ES6+):** Pure Vanilla JS (no frameworks or libraries required).

---

## 📁 File Structure

```text
├── index.html   # Main HTML layout and form structures
├── style.css    # Clean, modern UI styles
└── script.js    # Data handlers (CRUD) and LocalStorage integration
```

---

## 🚀 How to Run

1. Clone or download the files into a single directory:
   - `index.html`
   - `style.css`
   - `script.js`
2. Double-click `index.html` to open it directly in any web browser.

No build step, node modules, or server setup required!

---

## 🧩 Code Architecture & CRUD Handlers

All operations run locally in the browser. The JavaScript logic in `script.js` is structured into clear, separate handler functions:

### 1. **Create (`handleCreate`)**
- Captures input values (`content` and `timestamp`).
- Generates a unique string ID using `Date.now()`.
- Prepends the new entry to the array and saves it to `localStorage`.

### 2. **Read (`handleRead`)**
- Fetches all records stored in `localStorage`.
- Clears the DOM list element and dynamically renders each entry card.
- Automatically handles the empty state when no entries are saved.

### 3. **Update (`prepareEdit` & `handleUpdate`)**
- **`prepareEdit(id)`**: Locates the selected item, populates the form fields, changes button text, and reveals a "Cancel Edit" button.
- **`handleUpdate(id, content, timestamp)`**: Replaces the matching entry in array storage and updates `localStorage`.

### 4. **Delete (`handleDelete`)**
- Prompts the user for confirmation.
- Filters out the item by `id` from the entries array.
- Clears the active edit form if the entry currently being edited is deleted.

---

## 💡 LocalStorage Helpers

- `getStoredEntries()`: Retrieves and parses the JSON string from `localStorage`.
- `saveStoredEntries(entries)`: Stringifies the JS array and saves it under the storage key `simple_diary_app_entries`.