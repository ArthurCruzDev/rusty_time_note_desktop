CREATE TABLE IF NOT EXISTS external_ids(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS timenotes_external_ids(
    timenote_id INTEGER NOT NULL,
    external_id_id INTEGER NOT NULL,
    FOREIGN KEY(timenote_id) REFERENCES timenotes(id) ON DELETE CASCADE,
    FOREIGN KEY(external_id_id) REFERENCES external_ids(id) ON DELETE CASCADE,
    PRIMARY KEY(timenote_id, external_id_id)
);