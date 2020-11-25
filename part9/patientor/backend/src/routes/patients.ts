import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientInfo = patientService.addPatient(
    name, dateOfBirth, ssn, gender, occupation
  );
  res.json(newPatientInfo);
});

export default router;