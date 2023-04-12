use crate::{db_manager::DBManager, entities::timenote::TimeNote};
use log::error;

#[tauri::command]
pub async fn find_all_timenotes_by_notebook_id(
    db_manager: tauri::State<'_, DBManager>,
    notebook_id: u32,
) -> Result<Vec<TimeNote>, String> {
    match db_manager
        .execute_query(
            "SELECT * FROM timenotes WHERE notebook_id = ? ORDER BY id DESC",
            [notebook_id],
            |row| {
                return Ok(TimeNote {
                    id: row.get(0).unwrap(),
                    description: row.get(1).unwrap(),
                    notebook_id: row.get(2).unwrap(),
                    history_link_id: row.get(3).unwrap(),
                    created_at: row.get(4).unwrap(),
                    start_datetime: row.get(5).unwrap(),
                    finish_datetime: row.get(6).unwrap(),
                });
            },
        )
        .await
    {
        Ok(query_results) => {
            let mut final_vector = Vec::<TimeNote>::new();
            for result in query_results.iter() {
                match result {
                    Ok(timenote) => {
                        final_vector.push(timenote.to_owned());
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
