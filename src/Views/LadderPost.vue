<template>
    <v-layout justify-center class="layout-ladder-post">
        <v-flex justify-center
                align-start
                class="ladder-posts-wrap">
            <v-flex class="ladder-post-btn">
                <v-btn @click="postLadder"
                       class="contribution-btn"
                       depressed
                       ripple
                >投稿する</v-btn>
            </v-flex>
            <LadderPostItem
                v-on:emitTitle="onTitle"
                v-on:emitSubTitle=""
                v-on:emitUrl=""
                v-on:emitDescription=""
            />
            <div class="ladder-post-icon">
                <v-icon size="40">control_point</v-icon>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
  import LadderPostItem from '../components/LadderPostItemComponent'
  import axios from 'axios'

  export default {
    name: "LadderPost",
    data(){
      return{
        ladderTitle: null,
        unitTitle: null,
        description: null,
        url: null,
        index: null
      }
    },
    methods: {
      onTitle(value){console.log(value)},
      postLadder() {
        let token = this.$store.state.token
        console.log(this.$store.state.token)

        axios.post('/api/ladder/',
            {
              header: {
                'Content-Type': 'application/json',
              },
              Authorization: 'JWT '+token,
              title: 'ladderの使い方',
              units: [
                {
                  title: '会員登録してみよう',
                  description: '右上の丸いボタンから会員登録のダイアログへ行けます',
                  url: 'https://www.yahoo.co.jp',
                  index: 1
                }
              ]
            }).then((response)=>{
          console.log(response.data)
        }).catch((error)=>{
          console.log(error)
        })
      }
    },
    components: {
      LadderPostItem
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/ladderPost"
</style>