use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExternalId {
    pub id: u32,
    pub name: String,
}

impl ExternalId {}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateExternalId {
    pub name: String,
}
