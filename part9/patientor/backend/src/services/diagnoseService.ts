import diagnoseData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnoseData as Diagnosis[];

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries
};