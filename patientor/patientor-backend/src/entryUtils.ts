import { Diagnosis, EntryWithoutId, HealthCheckRating } from './types';

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object' || !('type' in object)) {
    throw new Error('Incorrect or missing data');
  }

  if (
    !('description' in object && 'date' in object && 'specialist' in object)
  ) {
    throw new Error('Incorrect or missing data');
  }

  switch (object.type) {
    case 'Hospital':
      if ('discharge' in object) {
        const newEntry = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          discharge: parseDischarge(object.discharge),
          diagnosisCodes: parseDiagnosisCodes(object),
          type: object.type,
        };
        return newEntry;
      } else {
        throw new Error('Incorrect or missing data');
      }
    case 'OccupationalHealthcare':
      if ('employerName' in object && 'sickLeave' in object) {
        const newEntry = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          employerName: parseEmployerName(object.employerName),
          sickLeave: parseSickLeave(object.sickLeave),
          type: object.type,
        };

        return newEntry;
      } else {
        throw new Error('Incorrect or missing data');
      }
    case 'HealthCheck':
      if ('healthCheckRating' in object) {
        const newEntry = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          healthCheckRating: parseHealtCheckRating(object.healthCheckRating),
          type: object.type,
        };

        return newEntry;
      } else {
        throw new Error('Incorrect or missing data');
      }
    default:
      throw new Error(`Unhandled type`);
  }
};

const isString = (input: unknown): input is string => {
  return typeof input === 'string' || input instanceof String;
};

const isNumber = (input: unknown): input is number => {
  return typeof input === 'number';
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing date: ' + criteria);
  }
  return criteria;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }
  return employerName;
};

const parseDischarge = (object: unknown) => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('date' in object) ||
    !('criteria' in object)
  ) {
    throw new Error('Incorrect or missing data: ' + object);
  }
  const newDiscaharge = {
    date: parseDate(object.date),
    criteria: parseCriteria(object.date),
  };

  return newDiscaharge;
};

const parseSickLeave = (object: unknown) => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('startDate' in object) ||
    !('endDate' in object)
  ) {
    throw new Error('Incorrect or missing data: ' + object);
  }
  const SickLeaveObject = {
    startDate: parseDate(object.startDate),
    endDate: parseCriteria(object.endDate),
  };

  return SickLeaveObject;
};

const isHealthCheckRating = (input: number): input is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v as number)
    .includes(input);
};

const parseHealtCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || rating === null || !isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing data: ' + rating);
  }
  return rating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export default toNewEntry;
