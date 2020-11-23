const checkArguments = (args: string[]): void => {
  if (args.length > 4) throw new Error('Too many arguments');
  if (args.length < 4) throw new Error('Too few arguments');
}

const parseArgument = (argument: string): number => {
  if (!isNaN(Number(argument))) {
    return Number(argument);
  } else {
    throw new Error(`Provided value ${argument} was not a number`);
  }
}

const calculateBmi = (a: number, b: number): string => {
  const result: number = b / (a / 100)**2;
  if (result < 15) {
    return 'Very severely underweight';
  }
  if (result < 16) {
    return 'Severely underweight';
  }
  if (result < 18.5) {
    return 'Underweight';
  }
  if (result < 25) {
    return 'Normal (healthy weight)';
  }
  if (result < 30) {
    return 'Overweight';
  }
  if (result < 35) {
    return 'Obese Class I (Moderately obese)';
  }
  if (result < 40) {
    return 'Obese Class II (Severely obese)';
  }
  return 'Obese Class III (Very severely obese)';
}

checkArguments(process.argv);
const height: number = parseArgument(process.argv[2]);
const weight: number = parseArgument(process.argv[3]);

console.log(calculateBmi(height, weight));
