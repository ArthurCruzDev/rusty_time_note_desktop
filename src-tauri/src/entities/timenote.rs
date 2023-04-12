use chrono::{DateTime, Local};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TimeNote {
    pub id: u32,
    pub description: String,
    pub notebook_id: u32,
    pub history_link_id: Option<u32>,
    pub created_at: DateTime<Local>,
    pub start_datetime: DateTime<Local>,
    pub finish_datetime: Option<DateTime<Local>>,
}

impl TimeNote {}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateTimeNoteDto {
    pub description: String,
    pub notebook_id: String,
    pub history_link_id: Option<u32>,
    pub created_at: DateTime<Local>,
    pub start_datetime: DateTime<Local>,
    pub finish_datetime: Option<DateTime<Local>>,
}
