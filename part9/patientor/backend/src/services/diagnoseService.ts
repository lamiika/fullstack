import diagnoseData from '../../data/diagnoses.json';

import { DiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = diagnoseData as DiagnoseEntry[];

const getEntries = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default {
  getEntries
};