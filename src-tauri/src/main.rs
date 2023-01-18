#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod db_manager;

use db_manager::DBManager;
use fast_log::Config;
use log::{error, Log};
use std::process::exit;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
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

    let db_manager = DBManager::new();

    if let Err(error_string) = db_manager.migrate() {
        error!("Failed to migrate local database: {}", error_string);
        logger.flush();
        exit(-1);
    }

    tauri::Builder::default()
        .manage(db_manager)
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
