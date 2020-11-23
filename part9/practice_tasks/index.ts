import express from 'express';
import { calculator, Operation, OperationTypes } from './calculator';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/calculate', (req, res) => {
  const { value1, value2, op } = req.query;

  if (OperationTypes.some(t => op === t)) {
    const result: number = calculator(Number(value1), Number(value2), op as Operation);
    res.send(`${result}`);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});