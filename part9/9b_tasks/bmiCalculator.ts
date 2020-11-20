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

console.log(calculateBmi(180, 74));
//Normal (healthy weight)