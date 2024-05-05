import patients from '../../data/patientsEntries';
import data from '../../data/patientsEntries';
import { v1 as uuid } from 'uuid';

import { Entry, EntryWithoutId, NewPatientEntry, Patient, PatientWithoutSsn } from '../types';

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = data.find(p => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    throw new Error('patient not found'); 
  }

  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatientsWithoutSsn,
  findById,
  addPatient,
  addEntry
};
