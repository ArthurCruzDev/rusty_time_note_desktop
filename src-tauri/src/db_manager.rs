const DB_NAME: &str = "rusty_time_note.db";
const DB_MIGRATIONS_PATH: &str = "./migrations";

use chrono::{DateTime, Local};
use log::info;
use rusqlite::{Connection, Error, MappedRows, Params, Result, Row};
use std::cmp::Ordering;
use std::fs::{self, DirEntry, File};
use std::io::{BufReader, Read};
use std::str::FromStr;
use std::sync::{Arc, Mutex};
use std::{fmt, num};

pub struct MigrationEntity {
    pub id: u32,
    pub name: String,
    pub execution_time: DateTime<Local>,
    pub success: bool,
}

#[derive(Debug, Clone)]
pub struct MigrationError {
    msg: String,
}
impl fmt::Display for MigrationError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", &self.msg)
    }
}

pub struct DBManager {
    connection: Arc<Mutex<Connection>>,
}

impl DBManager {
    pub fn new() -> Result<DBManager, MigrationError> {
        let conn = match Connection::open(DB_NAME) {
            Ok(connection) => connection,
            Err(error) => {
                return Err(MigrationError {
                    msg: format!(
                        "Failed to create or connect to local database: {}",
                        error.to_string(),
                    ),
                });
            }
        };
        Ok(DBManager {
            connection: Arc::new(Mutex::new(conn)),
        })
    }

    pub async fn migrate(&self) -> Result<(), MigrationError> {
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
                    return Err(MigrationError {
                        msg: format!("Failed to read db migrations: {}", e),
                    });
                }
            },
        };

        info!("{} files found in migrations directory", { files.len() });

        files.sort_by(|a, b| {
            a.file_name()
                .to_ascii_lowercase()
                .cmp(&b.file_name().to_ascii_lowercase())
        });

        let mutex = self.connection.lock().unwrap();

        let last_migration: Option<MigrationEntity> = match mutex
            .prepare("SELECT * FROM migrations WHERE success IS TRUE ORDER BY ID DESC LIMIT 1")
        {
            Ok(mut stmt) => {
                match stmt.query_map([], |row| {
                    return Ok(MigrationEntity {
                        id: row.get(0).unwrap(),
                        name: row.get(1).unwrap(),
                        execution_time: DateTime::<Local>::from_str(
                            row.get::<usize, String>(2).unwrap().as_str(),
                        )
                        .unwrap(),
                        success: match row.get::<usize, usize>(3).unwrap() {
                            0 => false,
                            _ => true,
                        },
                    });
                }) {
                    Ok(mut mapped_rows) => {
                        let next_value = mapped_rows.next();
                        match next_value {
                            Some(result) => match result {
                                Ok(migration) => Some(migration),
                                Err(result_error) => {
                                    return Err(MigrationError {
                                        msg: format!(
                                            "Error while getting migration from result set: {}",
                                            result_error
                                        ),
                                    });
                                }
                            },
                            None => Option::None,
                        }
                    }
                    Err(error) => {
                        return Err(MigrationError {
                            msg: format!("Failed to map result set: {}", error),
                        });
                    }
                }
            }
            Err(error) => match error {
                rusqlite::Error::SqliteFailure(_sqlite_error, _msg_option) => Option::None,
                _ => {
                    return Err(MigrationError {
                        msg: format!("Failed to prepare and execute query: {}", error),
                    });
                }
            },
        };

        for file in files.iter() {
            let file_name_os_string = file.file_name();
            let file_name = file_name_os_string
                .to_str()
                .unwrap_or("Unable to get file name");

            if last_migration.is_none()
                || file_name.cmp(last_migration.as_ref().unwrap().name.as_str())
                    == Ordering::Greater
            {
                match DBManager::read_migration_file_and_execute(file, &mutex) {
                    Ok(_) => {
                        info!("Migration {} executed successfully!", &file_name);
                    }
                    Err(migration_error) => {
                        return Err(MigrationError {
                            msg: migration_error.to_string(),
                        });
                    }
                }
            } else {
                info!("Migration {} skipped!", &file_name);
            }
        }

        Ok(())
    }

    fn read_migration_file_and_execute(
        file: &DirEntry,
        conn: &Connection,
    ) -> Result<(), MigrationError> {
        let file_name_os_string = file.file_name();
        let file_name = file_name_os_string
            .to_str()
            .unwrap_or("Unable to get file name");

        let file_pointer = File::open(file.path()).ok().ok_or_else(|| MigrationError {
            msg: format!("Failed to open migration file {}", file_name),
        })?;
        let mut buf_reader = BufReader::new(file_pointer);
        let mut file_contents = String::new();
        buf_reader
            .read_to_string(&mut file_contents)
            .ok()
            .ok_or_else(|| MigrationError {
                msg: format!("Failed to read file {}", file_name),
            })?;

        match conn.execute(file_contents.as_str(), ()) {
            Ok(_) => {
                match conn.execute(
                    "INSERT INTO migrations(name, execution_time, success) VALUES (?1, ?2, ?3)",
                    (&file_name, Local::now().to_rfc3339(), true),
                ) {
                    Ok(_) => {}
                    Err(error) => {
                        return Err(MigrationError {
                            msg: format!("Failed to insert record in migrations table: {}", error),
                        })
                    }
                }
            }
            Err(error) => {
                match conn.execute(
                    "INSERT INTO migrations(name, execution_time, success) VALUES (?1, ?2, ?3)",
                    (&file_name, Local::now().to_rfc3339(), false),
                ) {
                    Ok(_) => {}
                    Err(error) => {
                        return Err(MigrationError {
                            msg: format!("Failed to insert record in migrations table: {}", error),
                        })
                    }
                }
                return Err(MigrationError {
                    msg: format!(
                        "Failed to execute migration's {}: {}",
                        file_name,
                        &error.to_string()
                    ),
                });
            }
        }

        Ok(())
    }

    pub async fn execute_query<T, P, F>(
        &self,
        query: &str,
        params: P,
        map_function: F,
    ) -> Result<Vec<Result<T>>, MigrationError>
    where
        P: Params,
        F: FnMut(&Row<'_>) -> Result<T>,
    {
        let mutex = self.connection.lock().unwrap();

        let mut stmt = match mutex.prepare(query) {
            Ok(statement) => statement,
            Err(error) => {
                return Err(MigrationError {
                    msg: error.to_string(),
                })
            }
        };

        let results = match stmt.query_map(params, map_function) {
            Ok(mapped_rows) => mapped_rows,
            Err(query_error) => {
                return Err(MigrationError {
                    msg: query_error.to_string(),
                })
            }
        };

        Ok(results.collect())

        //retornar como lista pra ver se resolver problema de retorno de variável emprestada
    }

    pub async fn execute_upsert_or_delete<P>(
        &self,
        query: &str,
        params: P,
    ) -> Result<usize, MigrationError>
    where
        P: Params,
    {
        let mutex = self.connection.lock().unwrap();

        let results = match mutex.execute(query, params) {
            Ok(num_of_lines) => {}
            Err(error) => {
                return Err(MigrationError {
                    msg: error.to_string(),
                })
            }
        };
        Ok(1)
    }
}
