interface heightAndWeight {
  height: number;
  weight: number;
}

export const parseBmiArguments = (args: string[]): heightAndWeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface exercisesValues {
  target: number;
  hours: number[];
}

export const parseExerciseArguments = (args: string[]): exercisesValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  if (target === 0) throw new Error("Target value can't be 0");

  const hours = Array.from(args.slice(3), Number);

  if (!isNaN(Number(args[2])) && hours.every((item) => !isNaN(item))) {
    return {
      target,
      hours,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
