import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { NonSensitivePatientData, Patient, NewPatient, NewEntry, Entry } from '../types';

const patients: Patient[] = patientData;

const getAll = (): NonSensitivePatientData[] => {
  return patients.map(({ ssn, ...rest }) => ({
    ssn, ...rest
  }));
};

const getPatient = (id: string): Patient => {
  const patient: Patient | undefined = patients.find(patient => patient.id === id);

  if (patient) {
    return patient;
  }
  throw new Error('Couldn\'t find patient');
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuidv4(),
    ...entry
  };
  patients.map(patient => patient.id === id
    ? patient.entries.push(newEntry) : patient);

  return newEntry;
};

export default {
  getAll,
  getPatient,
  addPatient,
  addEntry
};