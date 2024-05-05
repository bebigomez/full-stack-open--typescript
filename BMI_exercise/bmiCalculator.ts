import { parseBmiArguments } from './parseFunctions';

parseBmiArguments;

export const calculateBmi = (height: number, weight: number): string => {
  const bmiValue = weight / (height / 100) ** 2;
  console.log(bmiValue);

  if (height === 0 || weight === 0) {
    throw new Error('Height and weight cannot be 0.');
  }

  if (bmiValue < 18.5) {
    return 'Underweight (Moderate thinness)';
  } else if (bmiValue < 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmiValue < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
