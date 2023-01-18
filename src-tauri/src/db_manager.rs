const DB_NAME: &str = "rusty_time_note.db";

use log::error;
use rusqlite::Connection;
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
}
