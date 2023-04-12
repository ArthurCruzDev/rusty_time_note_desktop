CREATE TABLE IF NOT EXISTS timenotes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    notebook_id INTEGER NOT NULL,
    history_link_id INTEGER,
    created_at TEXT NOT NULL,
    start_datetime TEXT NOT NULL,
    finish_datetime TEXT,
    FOREIGN KEY(notebook_id) REFERENCES notebooks(id) ON DELETE CASCADE,
    FOREIGN KEY(history_link_id) REFERENCES timenotes(id) ON DELETE SET NULL
);