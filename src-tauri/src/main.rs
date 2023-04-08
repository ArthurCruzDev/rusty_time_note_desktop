#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod db_manager;
mod entities;
mod services;

use db_manager::DBManager;
use fast_log::Config;
use log::{error, Log};
use std::process::exit;

#[tokio::main]
async fn main() -> Result<(), String> {
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

    if let Err(error_string) = db_manager.migrate().await {
        error!("Failed to migrate local database: {}", error_string);
        logger.flush();
        exit(-1);
    }

    tauri::Builder::default()
        .manage(db_manager)
        .invoke_handler(tauri::generate_handler![
            services::list_all_notebooks,
            services::create_notebook,
            services::find_notebook_by_id
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    Ok(())
}
