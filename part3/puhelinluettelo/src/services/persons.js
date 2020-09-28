import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => getAll())
}

const updateNumber = (replacementObject, duplicate) => {
  const request = axios.put(baseUrl + '/' + duplicate.id, replacementObject)
  return request.then(response => getAll())
}

const remove = id => {
  const request = axios.delete(baseUrl + '/' + id)
  return request.then(response => getAll())
}

export default { getAll, create, updateNumber, remove }