<template>
    <v-container>
      <div style="width:100%; height: 20px; color: darkgray; background-color: gainsboro">

      </div>
    <div class="flex-container">
        <BookCard v-for="item in cardItems" :cardItem="item" :key="item"></BookCard>
    </div>
</v-container>
</template>
<script>
import BookCard from './BookCard.vue'
import BookStoreService from '../service/BookStoreService'
export default {
  name: 'BookCardList',
  data: () => ({
    bookStoreService: new BookStoreService(),
    loading: false,
    selection: 1,
    cardItems: []
  }),
  methods: {
    addToCard () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    getBooks () {
      this.bookStoreService.getAll()
        .then(
          res => {
            this.cardItems = res.data.data
            console.log(this.cardItems)
          })
        .catch(error => {
          alert('Error getting books from server' + error.message)
        })
    }
  },
  components: {
    BookCard
  },
  created () {
    this.getBooks()
  }
}
</script>
<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
}
.flex-container > div{
    margin-left: 10px;
    margin-right: 10px;
}
</style>
