const DB_NAME: &str = "rusty_time_note.db";
const DB_MIGRATIONS_PATH: &str = "./migrations";

use log::{error, info};
use rusqlite::Connection;
use std::fs::{self, DirEntry, ReadDir};
use std::io;
use std::{
    process::exit,
    sync::{Arc, Mutex},
};

pub struct DBManager {
    connection: Arc<Mutex<Connection>>,
}

impl DBManager {
    pub fn new() -> DBManager {
        let conn = match Connection::open(DB_NAME) {
            Ok(connection) => connection,
            Err(error) => {
                error!("Failed to create or connect to local database: {}", error);
                exit(-1);
            }
        };
        DBManager {
            connection: Arc::new(Mutex::new(conn)),
        }
    }

    pub fn migrate(&self) -> Result<(), String> {
        let mut files: Vec<DirEntry> = match fs::read_dir(DB_MIGRATIONS_PATH) {
            Ok(paths) => paths
                .map(|file| file.unwrap())
                .filter(|file| {
                    file.path().is_file()
                        && file
                            .file_name()
                            .to_ascii_lowercase()
                            .to_str()
                            .unwrap()
                            .ends_with("sql")
                })
                .collect::<Vec<DirEntry>>(),
            Err(e) => match e.kind() {
                std::io::ErrorKind::NotFound => Vec::new(),
                _ => {
                    error!("Failed to read db migrations: {}", e);
                    return Err(e.to_string());
                }
            },
        };

        info!("{} files found in migrations directory", { files.len() });

        files.sort_by(|a, b| {
            a.file_name()
                .to_ascii_lowercase()
                .cmp(&b.file_name().to_ascii_lowercase())
        });

        for file in files.iter() {
            info!(
                "File name: {}",
                file.file_name()
                    .to_str()
                    .unwrap_or("error getting file name")
            )
        }

        Ok(())
    }
}
