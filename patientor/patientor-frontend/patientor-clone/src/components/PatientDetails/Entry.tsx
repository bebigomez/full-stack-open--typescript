import { Diagnosis, Entry } from "../../types";
import OccupationalHealthcareComponent from "./OccupationalHealthcareComponent";
import HealthCheckComponent from "./HealthCheckComponent";
import HospitalComponent from "./HospitalComponent";

interface EntrySwitchProps {
  entry: Entry,
  diagnoses: Diagnosis[],
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntrySwitch = (props: EntrySwitchProps) => {
  const { entry, diagnoses } = props;

  switch (entry.type) {
    case 'Hospital':
      return <HospitalComponent key={entry.id} entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareComponent key={entry.id} entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckComponent key={entry.id} entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntrySwitch;
