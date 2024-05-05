import { DiaryEntry } from "../types";

interface EntryProps {
  entry: DiaryEntry;
}
export const Entry = (props: EntryProps) => {
  return (
    <div>
      <h3>{props.entry.date}</h3>
      <div>{props.entry.visibility}</div>
      <div>{props.entry.weather}</div>
    </div>
  )
}