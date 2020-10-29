type Person {
  name: String!
  phone: String
  street: String!
  cite: String!
  id: ID!
}

type Query {
  personCount: Int!
  allPersons: [Person!]!
  findPerson(name: String!): Person
}