import { Favorite, Work } from "@mui/icons-material";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";

const styles = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '15px',
  },
};

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry,
  diagnoses: Diagnosis[],
}

const OccupationalHealthcareComponent = (props: OccupationalHealthcareEntryProps) => {
  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.entry.date}
        <Work style={{ marginLeft: 5}}/>
        <div>{props.entry.employerName}</div>
      </div>
      <em>{props.entry.description}</em>
      <br/>
      <Favorite style={{ color: 'yellow' }} />
      <div>diagnose by {props.entry.specialist}</div>
      <ul>
        {props.entry.diagnosisCodes?.map((code, index) => {
          const matchingItem = props.diagnoses.find(diagnosis => diagnosis.code === code);

          return matchingItem ? (
            <li key={index}>{matchingItem.code} {matchingItem.name}</li>
          ) : (
            <div key={index}>unknown diagnosis</div>
          );
        })}
      </ul>
    </div>
  );
};

export default OccupationalHealthcareComponent;