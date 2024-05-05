import { Favorite, LocalHospital } from "@mui/icons-material";
import { Diagnosis, HospitalEntry } from "../../types";

const styles = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '15px',
  },
};

interface HealthCheckEntryProps {
  entry: HospitalEntry,
  diagnoses: Diagnosis[],
}

const HospitalComponent = (props: HealthCheckEntryProps) => {
  
  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.entry.date}
        <LocalHospital style={{ marginLeft: 5}}/>
      </div>
      <em>{props.entry.description}</em>
      <br/>
      <Favorite style={{ color: 'red' }} />
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

export default HospitalComponent;