<template>
    <v-layout md8 lg8
              justify-center
              class="layout-ladder-list">
        <v-flex align-start　justify-center
                class="ladder-links-wrap">
            <div v-for="ladder in ladderList"
                 class="ladder-link-wrap">
                <router-link :to="`detail/${ ladder.id }`"
                             class="ladder-link">
                    <div class="ladder-thumb-wrap">
                        <img :alt="defaultImage.alt"
                             src="../assets/img/ladder_avatar.png"
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
        </v-flex>
    </v-layout>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "LadderListPage",
    data() {
      return {
        chartDialog: false,
        defaultImage: {
          src: "http://via.placeholder.com/350x150",
          alt: "placeholder-image"
        },
        ladderList: []
      }
    },
    mounted() {
      axios({
        method: 'GET',
        url: 'https://api.ladder.noframeschools.com/api/ladder/'
      }).then((response) => {
        this.ladderList = response.data.results
      }).catch((error) => {
        console.log(error)
      })
    },
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/ladderList"
</style>