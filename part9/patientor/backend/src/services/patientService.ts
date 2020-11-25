import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { NonSensitivePatientData, Patient } from '../types';

const patients: Patient[] = patientData as Patient[];

const getAll = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (
  name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string 
): Patient => {
  const newPatient = {
    id: uuidv4(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  addPatient
};