import { Alert, Button, TextField } from "@mui/material";
import { styles } from "../styles";
import { SyntheticEvent, useState } from "react";
import { EntryWithoutId } from "../../types";

interface EntryFormProps {
  error: string
  addEntry: (values: EntryWithoutId) => void;
}

const HealthCheckForm = (props: EntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const values: EntryWithoutId = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes: diagnosisCodes.split(',').map(item => item.trim())
    };
    props.addEntry(values);
  };


  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        {props.error && <Alert severity="error">{props.error}</Alert>}
        <h2>New HealthCheck entry</h2>
        <TextField
          style={styles.textField}
          variant="standard"
          label="Description"
          fullWidth
          value={description}
          onChange={(event) => { setDescription(event.target.value); }}
        />
        <TextField
          type="date"
          style={styles.textField}
          variant="standard"
          label="Date"
          fullWidth
          value={date}
          onChange={(event) => { setDate(event.target.value); }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          style={styles.textField}
          variant="standard"
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={(event) => { setSpecialist(event.target.value); }}
        />

        <TextField
          style={styles.textField}
          variant="standard"
          label="Healthcheck rating"
          fullWidth
          value={healthCheckRating}
          onChange={(event) => { setHealthCheckRating(Number(event.target.value)); }}
        />
        <TextField
          style={styles.textField}
          variant="standard"
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={(event) => { setDiagnosisCodes(event.target.value); }}
        />
        <div style={styles.buttonsDiv}>
          <Button variant="contained" style={styles.cancelButton}>CANCEL</Button>
          <Button type='submit' variant="contained" style={styles.addButton}>ADD</Button>
        </div>
      </form>
    </div>
  );
};

export default HealthCheckForm;