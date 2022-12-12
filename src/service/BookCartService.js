import axios from 'axios'
export default class BookCartService {
  addToCart (userToken, data) {
    return axios.post('http://localhost:8080/cart/add/' + userToken, data)
  }

  getAllCartItems (userToken) {
    return axios.get('http://localhost:8080/cart/all/' + userToken)
  }

  removeBookFromCart (cartId) {
    return axios.delete('http://localhost:8080/cart/remove/' + cartId
    )
  }
}
