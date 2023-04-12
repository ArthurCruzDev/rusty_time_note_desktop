import { Dayjs } from "dayjs";

export type TimeNote = {
  id?: number;
  description: string;
  notebook_id: number;
  history_link_id: number;
  created_at: string;
  start_datetime: string;
  finish_datetime?: string;
};

// export type TimeNoteDto = {
//   id?: number;
//   description: string;
//   notebook_id: number;
//   history_link_id: number;
//   created_at: string;
//   start_datetime: string;
//   finish_datetime?: string;
// };
