/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, NewEntry, NewBaseEntry,
  Diagnosis, Discharge, SickLeave, HealthCheckRating } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: any, type: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${type}: ` + text);
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth: " + date);
  }

  return date;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }

  return gender;
};

export const newPatientValidate = ( object: any ): NewPatient => {
  return {
    name: parseString(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, "occupation"),
    entries: []
  };
};

const areDiagnosisCodes = ( diagnosisCodes: any[] ): diagnosisCodes is Array<Diagnosis["code"]> => {
  return diagnosisCodes.every(diagnosis => parseString(diagnosis, "diagnosis"));
};

const parseDiagnosisCodes = ( diagnosisCodes: any ): Array<Diagnosis["code"]> => {
  if (!Array.isArray(diagnosisCodes) || !areDiagnosisCodes(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnosisCodes: " + diagnosisCodes)
  }
  return diagnosisCodes;
};

const baseEntryValidate = ( object: any ): NewBaseEntry => {
  const baseEntryBase: NewBaseEntry = {
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist")
  }

  if (!object.diagnosisCodes || (Array.isArray(object.diagnosisCodes) &&
      object.diagnosisCodes.length === 0)) {
    return baseEntryBase;
  }
  return {
    ...baseEntryBase,
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
  };
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error("Missing discharge :" + discharge);
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria, "criteria")
  };
};

const hospitalValidate = ( object: any ): NewEntry => {
  return {
    type: object.type,
    discharge: parseDischarge(object.discharge),
    ...baseEntryValidate(object)
  };
};

const parseSickLeave = ( sickLeave: any ): SickLeave => {
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate)
  };
};

const occupationalValidate = ( object: any ): NewEntry => {
  if (!object.sickLeave.startDate && !object.sickLeave.endDate) {
    return {
      type: object.type,
      employerName: parseString(object.employerName, "employerName"),
      ...baseEntryValidate(object)
    }
  }
  return {
    type: object.type,
    employerName: parseString(object.employerName, "employerName"),
    sickLeave: parseSickLeave(object.sickLeave),
    ...baseEntryValidate(object)
  };
};

const isRating = ( rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseRating = ( rating: any ): HealthCheckRating => {
  if (!rating || !isRating(rating)) {
    throw new Error("Incorrect or missing healthCheckRating: " + rating);
  }
  return rating;
};

const healthCheckValidate = ( object: any ): NewEntry => {
  return {
    type: object.type,
    healthCheckRating: parseRating(object.healthCheckRating),
    ...baseEntryValidate(object)
  };
};

export const newEntryValidate = ( object: any ): NewEntry => {
  if (!object.type) {
    throw new Error("Missing entry type: " + object.type);
  }
  if (object.type === "Hospital") {
    return hospitalValidate(object);
  }
  if (object.type === "OccupationalHealthcare") {
    return occupationalValidate(object);
  }
  if (object.type === "HealthCheck") {
    return healthCheckValidate(object);
  }
  throw new Error("Incorrect entry type: " + object.type);
};