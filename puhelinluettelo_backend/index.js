require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body', {
  skip: (req, res) => req.method !== 'POST' && req.method !== 'PUT'
}))

app.use(morgan('tiny', {
  skip: (req, res) => req.method === 'POST'
}))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendick",
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  console.log(req.params.id)
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.put('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const body = req.body

  persons = persons.filter(person => person.id !== id)

  const person = {
    id: id,
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  return res.status(200).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})