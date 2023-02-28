#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod db_manager;
mod entities;

use db_manager::DBManager;
use entities::notebook::{CreateNotebookDto, Notebook};
use fast_log::Config;
use log::{error, info, Log};
use rusqlite::params;
use std::process::exit;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn load_notebooks(db_manager: tauri::State<DBManager>) -> Result<Vec<Notebook>, String> {
    match db_manager.execute_query("SELECT * FROM notebooks ORDER BY id ASC", [], |row| {
        return Ok(Notebook {
            id: row.get(0).unwrap(),
            name: row.get(1).unwrap(),
            description: row.get(2).unwrap(),
            color: row.get(3).unwrap(),
        });
    }) {
        Ok(query_results) => {
            let mut final_vector = Vec::<Notebook>::new();
            for result in query_results.iter() {
                match result {
                    Ok(notebook) => {
                        final_vector.push(notebook.to_owned());
                    }
                    Err(error) => {
                        error!("{}", error);
                        return Err(error.to_string());
                    }
                }
            }
            Ok(final_vector)
        }
        Err(error) => {
            error!("{}", error);
            return Err(error.to_string());
        }
    }
}
#[tauri::command]
fn create_notebook(
    db_manager: tauri::State<DBManager>,
    notebook: CreateNotebookDto,
) -> Result<String, String> {
    info!("submitted notebook: {:?}", notebook);
    db_manager.execute_upsert_or_delete(
        "INSERT INTO notebooks (name, description, color) VALUES(?, ?, ?)",
        params![
            notebook.name.as_str(),
            notebook.description.as_str(),
            notebook.color.as_str(),
        ],
    );
    Ok("Notebook criado com sucesso".to_string())
}

fn main() {
    let _ = std::fs::remove_file("./rusty_time_note.log");
    let logger = fast_log::init(
        Config::new()
            .file("rusty_time_note.log")
            .console()
            .chan_len(Some(1000)),
    )
    .unwrap();

    let db_manager = match DBManager::new() {
        Ok(db_manager) => db_manager,
        Err(error) => {
            error!("Failed to migrate local database: {}", error.to_string());
            logger.flush();
            exit(-1);
        }
    };

    if let Err(error_string) = db_manager.migrate() {
        error!("Failed to migrate local database: {}", error_string);
        logger.flush();
        exit(-1);
    }

    tauri::Builder::default()
        .manage(db_manager)
        .invoke_handler(tauri::generate_handler![load_notebooks, create_notebook])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
