import express from 'express';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator, { Result } from './exerciseCalculator';
import { parseArgument, validateExercises } from './validator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height: number = parseArgument(req.query.height as string);
    const weight: number = parseArgument(req.query.weight as string);
    const result = bmiCalculator(height, weight);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  try {
    validateExercises(req);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }

  const daily_exercises: number[] = req.body.daily_exercises;
  const target: number = req.body.target;

  const result: Result = exerciseCalculator(daily_exercises, target);
  res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});