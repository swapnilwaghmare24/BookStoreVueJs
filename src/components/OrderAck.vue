<template>
    <v-container>
      <v-row justify="center" style="margin-left: 150px;">
        <v-col cols="8" justify="center">
          <img src="../assets/order.jpg"/>
        </v-col>
      </v-row>
      <v-row justify="center" style="margin-left: 150px;">
        <v-col justify="center" style="margin-left: 250px;">
          <h2 style="font: normal normal bold 25px/30px Lato;">Order Placed successfully</h2>
        </v-col>
      </v-row>
      <v-row justify="center" style="margin-left: 150px;">
        <v-col justify="center" style="margin-left: 250px;">
          <span>
              Congratualations!!!! Your order is placed<br>
              your order id is #{{orderId}} 
          </span>
        </v-col>
      </v-row>
    </v-container>
  </template>
  <script>
  import { sharedService } from '../service/AppSharedService'
  export default {
    name: 'OrderAck',
    data: () => ({
      orderId: 0,
      sharedService: sharedService
    }),
    created () {
      this.orderId = this.$route.params.orderId
      sharedService.HideSearchBox = true
      sharedService.HideCartBtn = true
      sharedService.Initialize()
    },
    beforeDestroy () {
      sharedService.HideCartBtn = false
    }
  }
  </script>
  <style scoped>
  img{
    height:250px;
    width: 450px;
    background: white;
    position: relative;
    
  }
 
  </style>