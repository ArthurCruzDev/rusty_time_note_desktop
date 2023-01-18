#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod db_manager;

use db_manager::DBManager;
use fast_log::Config;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let _ = std::fs::remove_file("./rusty_time_note.log");
    fast_log::init(
        Config::new()
            .file("rusty_time_note.log")
            .console()
            .chan_len(Some(1000)),
    )
    .unwrap();

    tauri::Builder::default()
        .manage(DBManager::new())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
