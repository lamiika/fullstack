import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { NonSensitivePatientData, Patient, NewPatient } from '../types';

const patients: Patient[] = patientData;

const getAll = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  addPatient
};