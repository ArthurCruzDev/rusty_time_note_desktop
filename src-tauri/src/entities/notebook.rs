use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Notebook {
    pub id: u32,
    pub name: String,
    pub description: String,
    pub color: String,
}

impl Notebook {}
