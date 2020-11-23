import express from 'express';
import bmiCalculator, { parseArgument } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height: number = parseArgument(req.query.height as string);
    const weight: number = parseArgument(req.query.weight as string);
    const result = bmiCalculator(height, weight);
    res.send(result);
  } catch (e) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});