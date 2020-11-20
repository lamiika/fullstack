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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
