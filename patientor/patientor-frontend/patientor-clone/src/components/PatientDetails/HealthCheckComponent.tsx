import { Favorite, MedicalServices } from "@mui/icons-material";
import { Diagnosis, HealthCheckEntry } from "../../types";

const styles = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '15px',
  },
};

interface HealthCheckEntryProps {
  entry: HealthCheckEntry,
  diagnoses: Diagnosis[],
}

const HealthCheckComponent = (props: HealthCheckEntryProps) => {

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.entry.date}
        <MedicalServices style={{ marginLeft: 5 }} />
      </div>
      <em>{props.entry.description}</em>
      <br />
      <Favorite style={{ color: 'green' }} />
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

export default HealthCheckComponent;