import axios from 'axios';

export default class BookOrderService {
  addOrder (userToken) {
    return axios.post('http://localhost:8080/order/add/' + userToken)
  }

  getOrder(){
    return axios.get('http://localhost:8080/order/getallorders')
}

getCancelOrder(){
  return axios.get('http://localhost:8080/order/getcancelorders')
}

getProcessOrder(){
  return axios.get('http://localhost:8080/order/getprocessorders')
}

getCompleteOrder(){
  return axios.get('http://localhost:8080/order/getcompleteorders')
}


cancelOrder(orderId) {
  return axios.put(`http://localhost:8080/order/cancelorder/${orderId}` )
}

}

