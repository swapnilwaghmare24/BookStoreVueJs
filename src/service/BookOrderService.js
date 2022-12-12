import axios from 'axios'
export default class BookOrderService {
  addOrder (userToken) {
    return axios.post('http://localhost:8080/order/add/' + userToken)
  }
}