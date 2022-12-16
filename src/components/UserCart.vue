<template>
    <div>
        <div class="cart">
            <v-container>

                <v-card  class="mx-auto" style=" width: 750px; height: inherit;">
                        
                        <div style="margin-top: 5px; text-align: center;" v-show="this.cartItems.length == 0">
                          Your Cart is empty
                        </div>
                        <UserCartItem @quantityChanged="CartItemQuantityChanged($event)" @itemIsRemoved="CartItemIsRemoved($event)" v-for="item in cartItems" :userCartItem="item" :key="item" style="margin-top: 5px;"></UserCartItem>
                        <v-btn class="btn-place-order" v-show="!this.cartItems.length == 0" color="red lighten-2" style="margin-top: 5px;" @click="PlaceOrder()">Place order</v-btn>
                        <v-btn class="btn-place-order" v-show ="this.cartItems.length == 0" color="red lighten-2" style="margin-top: 5px; margin-right: 10px;" @click="GoToHome()">Go to Home</v-btn>
                        <div style="margin-top: 10px;">
                            <v-expansion-panels :value='openIndex'>
                            <v-expansion-panel :disabled='customerDetailPanelDisable'>
                                <v-expansion-panel-header>Customer Details</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-form ref="form">
                                        <v-col cols="8">
                                            <v-row justify="center">
                                        <v-col>
                                            <v-text-field v-model="orderSummary.shippingName" label="Name" outlined ></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="orderSummary.shippingPhoneNo" label="Phone Number" outlined ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row justify="center">
                                        <v-col>
                                            <v-textarea v-model="orderSummary.shippingAddress" label="Address" outlined ></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row justify="center">
                                        <v-col>
                                            <v-text-field v-model="orderSummary.shippingState" label="State" outlined ></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="orderSummary.shippingCity" label="City" outlined ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row justify="center">
                                        <v-col>
                                            <v-text-field v-model="orderSummary.shippingZipCode" label="ZipCode" outlined ></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field label="Landmark" outlined ></v-text-field>
                                        </v-col>
                                    </v-row>
                                   
                                    </v-col>
                                    <v-col style="display: flex; flex-direction: row-reverse;">
                                        <v-btn color="red lighten-2" @click="CreateOrderSummary()">Continue</v-btn>
                                    </v-col>
                                    </v-form>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel :disabled='orderSummaryPanelDisable' style="margin-top: 5px;">
                                <v-expansion-panel-header>Order summary</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                  <v-list>
                                    <v-list-item-content>
                                      <v-list-item-titile>
                                        <v-list-item-subtitle>Deliver To</v-list-item-subtitle>
                                      </v-list-item-titile>
                                    </v-list-item-content>
                                    <v-list-item-content>
                                      <v-list-item-title>{{orderSummary.shippingName}}</v-list-item-title>
                                      <v-list-item-subtitle>{{orderSummary.shippingPhoneNo}}</v-list-item-subtitle>
                                      <v-list-item-subtitle>{{orderSummary.shippingAddress}}</v-list-item-subtitle>
                                      <v-list-item-subtitle>{{orderSummary.shippingCity}},{{orderSummary.shippingState}},{{orderSummary.shippingZipCode}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                  </v-list>
                                  <!-- Render using v-list -->
                                  <v-list three-line>
                                    <template v-for="item in this.orderSummary.bookOrders">
                                      <v-list-item v-if="item.bookName" :key="item.bookName">
                                        <v-list-item-avatar rounded="false">
                                          <v-img :src="item.bookImg"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                          <v-list-item-title v-html="item.bookName"></v-list-item-title>
                                          <v-list-item-subtitle v-html="item.autherName"></v-list-item-subtitle>
                                          <v-list-item-subtitle>Price {{item.price}}</v-list-item-subtitle>
                                          <v-list-item-subtitle>Quantity {{item.quantity}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                      </v-list-item>
                                    </template>
                                  </v-list>
                                  <h4>Total Order Price :  <span class="mdi mdi-currency-rupee"></span>{{this.orderSummary.totalPrice}} </h4>
                                  <div style="display: flex; flex-direction: row-reverse;">
                                        <v-btn color="red lighten-2" @click="Checkout()">CHECKOUT</v-btn>
                                  </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                        </div>
                </v-card>
            </v-container>
        </div>
    <div>
    </div>
    </div>
</template>
<script>
import { sharedService } from '@/service/AppSharedService'
import BookCartService from '@/service/BookCartService'
import BookStoreService from '../service/BookStoreService'
import UserCartItem from './UserCartItem.vue'
import BookOrderService from '@/service/BookOrderService' 
import router from '@/router'
export default {
  name: 'UserCart',
  components: {
    UserCartItem
  },
  data: () => ({
    bookOrderService: new BookOrderService(),
    cartService: new BookCartService(),
    bookStoreService: new BookStoreService(),
    cartItems: [],
    sharedService: sharedService,
    openIndex: -1,
    customerDetailPanelDisable: true,
    orderSummaryPanelDisable: true,
    orderSummary: {
      totalPrice: 0,
      bookOrders: [],
      shippingAddress: 'House no.8',
      shippingName: 'Swapnil',
      shippingPhoneNo: +919999999999,
      shippingState: 'Maharashtra',
      shippingZipCode: 431513,
      shippingCity: 'Hingoli',
      
    }
  }),
  methods: {
    Checkout () {
      this.bookOrderService.addOrder(sharedService.getSignedInUserAccessToken())
        .then(
          response => {
            alert('Order has been placed successfully. Status: ' + response.status)
            this.GetCartItemsForUser()
            const orderId = response.data.data.orderId
           router.push({ name: 'OrderAck', params: { orderId: orderId } })
          })
        .catch(error => {
          alert('Error inserting order ' + error.message)
        })
    },
    PlaceOrder () {
      this.openIndex = 0
      this.customerDetailPanelDisable = false
    },
    GetCartItemsForUser () {
      this.cartService.getAllCartItems(sharedService.getSignedInUserAccessToken()).then(response => {
        this.cartItems = response.data.data
        sharedService.SetCartItemCount(this.cartItems.length)
      })
        .catch(error => {
          alert('Failed to get cart items ' + error.message)
          this.response = 'Error: ' + error.response.status
        })
    },
    CartItemQuantityChanged (eventData) {
      eventData.cartItem.quantity = eventData.quantity
    },
   
    CreateOrderSummary () {
      this.openIndex = 1
      this.customerDetailPanelDisable = false
      this.orderSummaryPanelDisable = false
      this.orderSummary.totalPrice = 0
      this.orderSummary.bookOrders = []
      // Loop through each cart item,
      // find the book of the price and calculate total.
      // add each book present in cart, and it's quantity to the array
      this.cartItems.forEach(cartItem => {
        this.bookStoreService.getById(cartItem.book.bookId)
          .then(
            res => {
              const book = res.data.data
              this.orderSummary.totalPrice += cartItem.quantity * book.price
              this.orderSummary.bookOrders.push({
                bookId: cartItem.book.bookId,
                quantity: cartItem.quantity,
                bookName: book.bookName,
                bookImg: book.bookImg,
                autherName: book.autherName,
                price: book.price,
                totalPriceOfBook: cartItem.book.quantity * book.price
              })
            })
          .catch(error => {
            alert('Error getting book from server of id ' + this.userCartItem.bookID + '' + error.message)
          })
      })
    },
    GoToHome () {
      router.push({ name: 'BookCardList' })
    }
  },
  created () {
    sharedService.HideSearchBox = true
    this.GetCartItemsForUser()
  }
}
</script>
<style>
.cart{
    display: flex;
    flex-direction: column;
}
.cartItem{
    display: flex;
    flex-direction: row;
}
.cartdata{
    display: flex;
    flex-direction: column;
    margin-left: 25px;
}
.cartAction{
    margin-top: 10px;
}
.cartAction>input{
    text-align: center;
    margin-left: 2px;
    width: 25px;
}
.cart-order-btn{
    display: flex;
    flex-direction: row;
    width: 20px;
    margin-left: 550px;
    margin-bottom: 15px;
}
.customerDetail{
    margin-left: 540px;
    width: 800px;
    height: inherit;
}
.btn-place-order{
    margin-left: 550px;
    background-color: red;
}
</style>