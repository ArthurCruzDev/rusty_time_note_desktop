#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::exit;

use fast_log::Config;
use log::{error, info};
use rusqlite::Connection;

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

    let conn: Connection;
    match Connection::open("rusty_time_note.db") {
        Ok(connection) => {
            conn = connection;
        }
        Err(error) => {
            error!("Failed to connect to local database: {}", error);
            exit(-1);
        }
    }

    conn.execute(
        "create table if not exists cat_colors (
             id integer primary key,
             name text not null unique
         )",
        [],
    )
    .unwrap();
    conn.execute(
        "create table if not exists cats (
             id integer primary key,
             name text not null,
             color_id integer not null references cat_colors(id)
         )",
        [],
    )
    .unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
