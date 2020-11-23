type Rating = 1 | 2 | 3;

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  averageTime: number;
  target: number;
}

const calculateExercises = (daily_exercises: number[], target: number): Result => {
  console.log(daily_exercises);
  console.log(target);
  const periodLength: number = daily_exercises.length;
  const trainingDays: number = daily_exercises.filter(e => e > 0).length;
  const totalHours: number = daily_exercises.reduce(
    (acc: number, curr: number) => acc + curr
  );
  const averageTime: number = totalHours / periodLength;
  const success: boolean = averageTime >= target;
  let rating: Rating = 1;

  if (trainingDays / periodLength >= 2 / 3) {
    rating = 2;
    if (success) {
      rating = 3;
    }
  } else if (success) {
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
    success,
    rating,
    ratingDescription,
    target,
    averageTime
  };
};

export default calculateExercises;
