import patientData from '../../data/patients';

import { NonSensitivePatientData, Patient } from '../types';

const patients: Patient[] = patientData as Patient[];

const getAll = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
}

export default {
  getAll
};