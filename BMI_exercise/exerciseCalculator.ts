interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

export const calculateExercises = (
  target: number,
  trainingHours: number[]
): Result => {
  const periodLength = trainingHours.length;
  const trainingDays = trainingHours.filter((i) => i > 0).length;
  const average =
    trainingHours.reduce((accumulator, current) => accumulator + current, 0) /
    periodLength;
  const success = average >= target;

  let rating;
  if (average < target * 0.5) {
    rating = 1;
  } else if (average < target) {
    rating = 2;
  } else {
    rating = 3;
  }

  let ratingDescription;
  if (rating === 1) {
    ratingDescription = 'You should try harder';
  } else if (rating === 2) {
    ratingDescription = 'Close, but you can do better';
  } else {
    ratingDescription = 'You did it, congrats!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
