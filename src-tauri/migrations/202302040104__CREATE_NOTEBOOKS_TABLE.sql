CREATE TABLE IF NOT EXISTS notebooks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(500) NOT NULL,
    color VARCHAR(50) NOT NULL
);