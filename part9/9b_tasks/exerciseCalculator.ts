type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  targetReached: boolean;
  rating: Rating;
  ratingDescription: string;
  averageTime: number;
  targetAverageTime: number;
};

const checkArguments = (args: string[]): void => {
  if (args.length < 4) throw new Error('Too few arguments');
}

const parseArgument = (argument: string): number => {
  if (!isNaN(Number(argument))) {
    return Number(argument);
  } else {
    throw new Error(`Provided value ${argument} was not a number`);
  }
}

const calculateExercises = (exerciseHours: number[], targetAverageTime: number): Result => {
  const periodLength: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter(e => e > 0).length;
  const totalHours: number = exerciseHours.reduce(
    (acc: number, curr: number) => acc + curr
  );
  const averageTime: number = totalHours / periodLength;
  const targetReached: boolean = averageTime >= targetAverageTime;
  let rating: Rating = 1;

  if (trainingDays / periodLength >= 2 / 3) {
    rating = 2;
    if (targetReached) {
      rating = 3;
    }
  } else if (targetReached) {
    rating = 2;
  }

  let ratingDescription: string;

  switch (rating) {
    case (1):
      ratingDescription = 'task failed succesfully';
      break;
    case (2):
      ratingDescription = '2.0 not great not terrible';
      break;
    case (3):
      ratingDescription = 'wauw';
  }

  return {
    periodLength,
    trainingDays,
    targetReached,
    rating,
    ratingDescription,
    averageTime,
    targetAverageTime
  }
}

checkArguments(process.argv);
const targetAverageTime: number = parseArgument(process.argv[2]);
const exerciseHours: number[] = process.argv.slice(3).map(arg =>
  parseArgument(arg)
);

console.log(calculateExercises(exerciseHours, targetAverageTime));
