import express from 'express';
import patientService from '../services/patientService';
import { newPatientValidate, newEntryValidate } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatientInfo = newPatientValidate(req.body);

    const addedPatient = patientService.addPatient(newPatientInfo);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    console.log(req.body);
    const newEntryInfo = newEntryValidate(req.body);

    const addedEntry = patientService.addEntry(req.params.id, newEntryInfo);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;