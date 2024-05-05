import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import { useEffect, useState } from 'react';
import { Entry, EntryWithoutId, Patient } from '../../types';
import { Male, Female } from '@mui/icons-material';
import PatientEntries from './PatientEntries';
import patientsService from '../../services/patients';
import axios from 'axios';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState('');
  const [entryType, setEntryType] = useState('HealthCheck');

  useEffect(() => {
    const fetchPatient = () => {
      if (id) {
        patients.getOnePatient(id)
          .then(patientData => {
            setPatient(patientData);
          })
          .catch(error => {
            console.error('Error fetching patient:', error);
          });
      }
    };

    fetchPatient();
  }, [id]);

  const addEntry = async (values: EntryWithoutId) => {
    if (patient) {
      try {
        const newEntry = await patientsService.createEntry(values, patient.id);
        setPatient({ ...patient, entries: patient.entries.concat(newEntry as Entry) });
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);

            setError(message);
            setTimeout(() => {
              setError('');
            }, 3000);

          } else {
            setError("Unrecognized axios error");
            setTimeout(() => {
              setError('');
            }, 3000);
          }
        } else {
          setError("Unknown error");
          setTimeout(() => {
            setError('');
          }, 3000);
        }
      }

    }

  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 style={{ display: 'flex', alignItems: 'center' }}>
        {patient.name}
        {patient.gender === 'male' && <Male />}
        {patient.gender === 'female' && <Female />}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      <FormControl component="fieldset">
        <h2>Entry type:</h2>
        <RadioGroup
          row
          aria-label="entry-type"
          name="entry-type"
          value={entryType}
          onChange={(event) => setEntryType(event.target.value)}
        >
          <FormControlLabel value="HealthCheck" control={<Radio />} label="Health Check" />
          <FormControlLabel value="OccupationalHealthcareEntry" control={<Radio />} label="Occupational Healthcare" />
          <FormControlLabel value="Hospital" control={<Radio />} label="Hospital" />
        </RadioGroup>
      </FormControl>

      {entryType === 'HealthCheck' && <HealthCheckForm addEntry={addEntry} error={error} />}
      {entryType === 'OccupationalHealthcareEntry' && <OccupationalHealthcareForm addEntry={addEntry} error={error} />}
      {entryType === 'Hospital' && <HospitalForm addEntry={addEntry} error={error} />}

      <PatientEntries entries={patient.entries} />
    </div>
  );
};

export default PatientDetails;
