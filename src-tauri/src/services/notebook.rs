use crate::{
    db_manager::DBManager,
    entities::notebook::{CreateNotebookDto, Notebook},
};
use log::{error, info};
use rusqlite::params;

#[tauri::command]
pub async fn load_notebooks(
    db_manager: tauri::State<'_, DBManager>,
) -> Result<Vec<Notebook>, String> {
    match db_manager
        .execute_query("SELECT * FROM notebooks ORDER BY id ASC", [], |row| {
            return Ok(Notebook {
                id: row.get(0).unwrap(),
                name: row.get(1).unwrap(),
                description: row.get(2).unwrap(),
                color: row.get(3).unwrap(),
            });
        })
        .await
    {
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
pub async fn create_notebook(
    db_manager: tauri::State<'_, DBManager>,
    notebook: CreateNotebookDto,
) -> Result<String, String> {
    info!("submitted notebook: {:?}", notebook);
    db_manager
        .execute_upsert_or_delete(
            "INSERT INTO notebooks (name, description, color) VALUES(?, ?, ?)",
            [
                notebook.name.as_str(),
                notebook.description.as_str(),
                notebook.color.as_str(),
            ],
        )
        .await;
    Ok("Notebook criado com sucesso".to_string())
}

#[tauri::command]
pub async fn load_notebook_by_id(
    db_manager: tauri::State<'_, DBManager>,
    id: u32,
) -> Result<Notebook, String> {
    match db_manager
        .execute_query("SELECT * FROM notebooks WHERE id = ?", [id], |row| {
            return Ok(Notebook {
                id: row.get(0).unwrap(),
                name: row.get(1).unwrap(),
                description: row.get(2).unwrap(),
                color: row.get(3).unwrap(),
            });
        })
        .await
    {
        Ok(query_results) => match query_results.first() {
            Some(notebook_result) => match notebook_result {
                Ok(notebook) => {
                    return Ok(notebook.to_owned());
                }
                Err(error) => {
                    error!("{}", error);
                    return Err(error.to_string());
                }
            },
            None => Err("none".to_string()),
        },
        Err(error) => {
            error!("{}", error);
            return Err(error.to_string());
        }
    }
}
