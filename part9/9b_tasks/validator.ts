export const parseArgument = (argument: string): number => {
  if (!isNaN(Number(argument))) {
    return Number(argument);
  } else {
    throw new Error(`Provided value ${argument} was not a number`);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateExercises = (req: any): void => {
  if (!req) {
    throw new Error('parameters missing');
  }

  if (!req.body) {
    throw new Error('parameters missing');
  }

  if (!req.body.target || !req.body.daily_exercises) {
    throw new Error('parameters missing');
  }

  if (!(typeof req.body.target === 'number')) {
    throw new Error('malformatted parameters: target was not a number');
  }

  if (!(req.body.daily_exercises instanceof Array)
      || req.body.daily_exercises.some(isNaN)) {

    throw new Error('malformatted parameters: daily_exercises was not an array of numbers');
  }
};