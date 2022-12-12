<template>
<v-app>
  <v-app-bar app color="cyan">
    
    <!--<img src="./assets/bookstoreLogo.png" @click="GotoHomePage" style="cursor:pointer" class="book-store-logo"/>-->
    <v-toolbar-title v-text="appTitle" @click="GotoHomePage" style="cursor:pointer"></v-toolbar-title>
    <v-spacer/>
     <!--<div class="searchBox">
      <v-text-field label="Search here" solo >
        <v-icon slot="append" color="red lighten-3">mdi-magnify</v-icon>
      </v-text-field>
    </div>-->
    <v-spacer/>
    <v-btn depressed right color="cyan" @click="CartBtnClicked()">
      <v-icon right dark>mdi-cart-outline</v-icon>
      <span style="margin-left:2px">{{sharedService.cartItemCount}}</span>
    </v-btn>
    <v-btn v-show="!isSignedIn" @click="SignInBtnClicked()" depressed right color="cyan">Sign In
        <!--<v-icon right dark>mdi-login-variant</v-icon>-->
    </v-btn>
    <v-btn v-show="!isSignedIn" @click="SignUpBtnClicked()" depressed right color="cyan">Sign Up
      <!--<v-icon right dark>mdi-arrow-right-drop-circle-outline</v-icon>-->
    </v-btn>
    <v-btn v-show="isSignedIn" @click="SignOutBtnClicked()" depressed right color="cyan">Sign Out
     <!-- <v-icon right dark>mdi-arrow-right-drop-circle-outline</v-icon>-->
    </v-btn>
  </v-app-bar>
  <v-main>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-main>

   <!-- <v-footer app v-text="appFooter" color="black" dark>
  </v-footer>-->
</v-app>
</template>

<script>
import router from '@/router'
import { sharedService } from './service/AppSharedService'
export default {
  name: 'App',

  data: () => ({
    appTitle: 'Bookstore',
   // appFooter: '',
    isSignedIn: sharedService.IsSignedIn(),
    sharedService: sharedService
  }),
  methods:
  {
    SignInBtnClicked () {
      router.push({ name: 'SignIn' })
    },
    SignUpBtnClicked () {
      router.push({ name: 'SignUp' })
    },
    CartBtnClicked () {
      router.push({ name: 'UserCart' })
    },
    GotoHomePage () {
      router.push({ name: 'BookCardList' })
    },
    SignOutBtnClicked () {
      sharedService.SetSignedOut()
      location.href = '/'
    }
  },
  created () {
    sharedService.Initialize()
  }
}
</script>
<style>
  .searchBox
  {
    max-height: 46px;
    width: 50%;
  }
  .book-store-logo{
    height:40px;
    width:35px;
    margin-right: 10px;
  }
</style>
