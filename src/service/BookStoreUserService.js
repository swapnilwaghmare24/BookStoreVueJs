import axios from 'axios'
export default class BookStoreUserService {
  add (data) {
    return axios.post('http://localhost:8080/bridgelabz/register', data)
  }

  login (data) {
    return axios.post('http://localhost:8080/bridgelabz/login', data)
  }
}
