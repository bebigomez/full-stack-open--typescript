import { Alert, Button, TextField } from "@mui/material";
import { styles } from "../styles";
import { SyntheticEvent, useState } from "react";
import { EntryWithoutId } from "../../types";

interface EntryFormProps {
  error: string
  addEntry: (values: EntryWithoutId) => void;
}

const HospitalForm = (props: EntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const values: EntryWithoutId = {
      type: "Hospital",
      description,
      date,
      specialist,
      discharge: {
        date: dischargeDate,
        criteria,
      },
      diagnosisCodes: diagnosisCodes.split(',').map(item => item.trim())
    };
    props.addEntry(values);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        {props.error && <Alert severity="error">{props.error}</Alert>}
        <h2>New Hospital entry</h2>
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
          type="date"
          style={styles.textField}
          variant="standard"
          label="Discharge date"
          fullWidth
          value={dischargeDate}
          onChange={(event) => { setDischargeDate(event.target.value); }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          style={styles.textField}
          variant="standard"
          label="Criteria"
          fullWidth
          value={criteria}
          onChange={(event) => { setCriteria(event.target.value); }}
        />

        <TextField
          style={styles.textField}
          variant="standard"
          label="Diagnosis code"
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

export default HospitalForm;