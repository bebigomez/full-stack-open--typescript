import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../../types";
import diagnosesService from "../../services/diagnoses";
// import GenericEntry from "./HospitalEntry";
// import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import EntrySwitch from "./Entry";

interface EntriesProp {
  entries: Entry[]
}

const PatientEntries = (props: EntriesProp) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosesService.getAll()
      .then(data => {
        setDiagnoses(data);
      })
      .catch(error => {
        console.error('Error fetching diagnoses:', error);
      });
  }, []);

  return (
    <>
      <h2>entries</h2>
      {props.entries.map(entry => (
        <EntrySwitch key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </>
  );
};

export default PatientEntries;