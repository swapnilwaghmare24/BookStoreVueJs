<template>
    <div>
        <router-link to="/cancelorders"><h5>Check Cancelled Orders</h5></router-link>
        <router-link to="/processorders"><h5>Check Processing Orders</h5></router-link>
        <router-link to="/completeorders"><h5>Check Completed Orders</h5></router-link>
        
        <div>
        <v-card class="mx-auto mb-12" flat height="500px" max-width="1200px">
        <v-simple-table class="mt-10 elevation-2"  light>
            <template v-slot:default>
                    <tr class="grey--text" >
                        <th class="text-center"></th>
                        <th class="text-center" >OrderId</th>
                        <th class="text-center" >Date</th>
                        <th class="text-center" >Address</th>
                        <th class="text-center" >Book Name</th>
                        <th class="text-center" >Quantity</th>
                        <th class="text-center" >Price</th>
                        <th class="text-center" >Total</th>
                        <th class="text-center" >Status</th>
                    </tr>
                    <tr v-for="order in orderData" :key="order.orderId">
                        <td class="text-center"><img :src="order.book.bookImg" :contain="true" height="100px" width="80px" /></td>
                        <td class="text-center">{{ order.orderId }}</td>
                        <td class="text-center ">{{ order.date }}</td>
                        <td class="text-center">{{ order.address }}</td>
                        <td class="text-center">{{ order.book.bookName }}</td>
                        <td class="text-center">{{ order.quantity }}</td>
                        <td class="text-center">{{ order.price }}</td>
                        <td class="text-center">{{ order.price }}</td>
                        <td class="text-center"><v-btn class="white--text mt-0" color="#E53935"
                        v-if="order.cancel == 0" @click="cancel(order.orderId)" small>Cancel</v-btn>
                        <v-btn depressed disabled small
                        v-else>Cancelled</v-btn></td>
                    </tr>
                   
            </template>
        </v-simple-table>
        </v-card>
        
        </div>
       
    </div>
    
       
        
    </template> 
    
    <script>
    import BookOrderService from "../service/BookOrderService";
    
    export default {
       
        name: "myorders",
        
        data() {
            return {
                bookOrderService: new BookOrderService(),
                orderData: [],
            }
        },
        methods:{
            cancel(orderId){
                var answer = window.confirm("Do you want to cancel the order ?");
                    if (answer === true) {
                    this.bookOrderService.cancelOrder(orderId).then((response) => {
                    this.orderData = response.data.data;
                    alert("Order cancelled successfully!!!!!");
                        window.location.reload();
                    })
                }
                else {
                        window.location.reload();
                    }
                
            },
            getOrders(){
               this.bookOrderService.getOrder().then((response) => {
                    console.log(response)
                    this.orderData = response.data.data;
                })
            },
},
        created() {
          this.getOrders();
        }
    }
    </script>
    
    <style scoped>
    </style>