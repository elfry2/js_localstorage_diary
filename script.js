const STORAGE_KEY = 'simple_diary_app_entries';

// Initialize app on page load
document.addEventListener('DOMContentLoaded', () => {
    setDefaultTimestamp();
    handleRead();

    // Form submission router (handles both Create and Update)
    document.getElementById('diary-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('entry-id').value;
        const content = document.getElementById('entry-content').value;
        const timestamp = document.getElementById('entry-timestamp').value;

        if (id) {
            handleUpdate(id, content, timestamp);
        } else {
            handleCreate(content, timestamp);
        }
    });
});

// Helper: Format current date for datetime-local input format (YYYY-MM-DDThh:mm)
function formatLocalDateTime(date = new Date()) {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().slice(0, 16);
}

function setDefaultTimestamp() {
    document.getElementById('entry-timestamp').value = formatLocalDateTime();
}

function resetForm() {
    document.getElementById('diary-form').reset();
    document.getElementById('entry-id').value = '';
    document.getElementById('submit-btn').textContent = 'Add Entry';
    document.getElementById('cancel-btn').style.display = 'none';
    setDefaultTimestamp();
}

// ==========================================
// CRUD HANDLER FUNCTIONS
// ==========================================

// 1. CREATE Handler
function handleCreate(content, timestamp) {
    const entries = getStoredEntries();
    
    const newEntry = {
        id: Date.now().toString(), // Simple unique ID using timestamp
        timestamp: timestamp || formatLocalDateTime(),
        content: content
    };

    entries.unshift(newEntry); // Add to the beginning of the array
    saveStoredEntries(entries);
    
    resetForm();
    handleRead(); // Refresh UI
}

// 2. READ Handler (Renders all entries to the DOM)
function handleRead() {
    const entries = getStoredEntries();
    const listContainer = document.getElementById('diary-list');
    
    listContainer.innerHTML = '';

    if (entries.length === 0) {
        listContainer.innerHTML = '<div class="empty-state">No diary entries found. Write your first entry above!</div>';
        return;
    }

    entries.forEach(entry => {
        const entryEl = document.createElement('div');
        entryEl.className = 'diary-entry';
        entryEl.innerHTML = `
            <div class="entry-header">
                <span><strong>${entry.timestamp.replace('T', ' ')}</strong></span>
                <div>
                    <button class="secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="prepareEdit('${entry.id}')">Edit</button>
                    <button class="danger" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="handleDelete('${entry.id}')">Delete</button>
                </div>
            </div>
            <p class="entry-content">${escapeHtml(entry.content)}</p>
        `;
        listContainer.appendChild(entryEl);
    });
}

// 3. UPDATE Handler (Helper to load into form + Finalizer)
function prepareEdit(id) {
    const entries = getStoredEntries();
    const entry = entries.find(e => e.id === id);
    
    if (!entry) return;

    document.getElementById('entry-id').value = entry.id;
    document.getElementById('entry-content').value = entry.content;
    document.getElementById('entry-timestamp').value = entry.timestamp;

    document.getElementById('submit-btn').textContent = 'Save Changes';
    document.getElementById('cancel-btn').style.display = 'inline-block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleUpdate(id, content, timestamp) {
    let entries = getStoredEntries();
    const index = entries.findIndex(e => e.id === id);

    if (index !== -1) {
        entries[index].content = content;
        entries[index].timestamp = timestamp;
        saveStoredEntries(entries);
    }

    resetForm();
    handleRead(); // Refresh UI
}

// 4. DELETE Handler
function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this diary entry?')) return;

    let entries = getStoredEntries();
    entries = entries.filter(e => e.id !== id);
    
    saveStoredEntries(entries);
    
    // If we were currently editing the deleted item, reset the form
    if (document.getElementById('entry-id').value === id) {
        resetForm();
    }

    handleRead(); // Refresh UI
}

// ==========================================
// LOCALSTORAGE PERSISTENCE HELPERS
// ==========================================

function getStoredEntries() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveStoredEntries(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// Basic XSS safety utility for text content rendering
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}