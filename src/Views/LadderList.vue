<template>
    <v-layout md8 lg8
              justify-center
              class="layout-ladder-list">
        <v-flex justify-center
                align-start
                class="ladder-links-wrap">
            <div v-for="ladder in ladderList" class="ladder-link-wrap">
                <router-link :to="`detail/${ ladder.id }`" class="ladder-link">
                    <div class="ladder-thumb-wrap" >
                        <img :src="defaultImage.src"
                             :alt="defaultImage.alt"
                             class="ladder-thumb">
                    </div>
                    <div class="ladder-info-wrap">
                        <h2 class="ladder-link-title">{{ ladder.title }}</h2>
                        <p class="ladder-link-attach">
                            学習中: <span>{{ ladder.count_learning_number }}</span>
                        </p>
                    </div>
                </router-link>
            </div>
        </v-flex >
    </v-layout>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "LadderList",
    data(){
      return{
        defaultImage: {
          src: "http://via.placeholder.com/350x150",
          src1: "../assets/img/book1.jpg",
          alt: "placeholder-image"
        },
        ladderList: []
      }
    },
    mounted() {
      axios.get('/api/ladder/', {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8000',
          'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS',
          'Access-Control-Max-Age': '1728000',
        }
      })
          .then((response) => {
            this.ladderList = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/ladderList"
</style>