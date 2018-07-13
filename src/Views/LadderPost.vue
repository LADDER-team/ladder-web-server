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
            <LadderPostItem/>
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
    methods: {
      postLadder(){
        let token = this.$store.state.token
        token = token.replace(/[\"]/g,"")

        axios.post('/api/ladder',
            {
              'headers': {
                'Authorization': 'JWT'+token,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
              },
              'body': {
                'title': "テスト",
                'units': [
                  {
                    'title': "test",
                    'description': "テスト",
                    'url': "https://www.google.co.jp/",
                    'index': 1,
                  }
                ],
              },
            }).then((response)=>{
              console.log(response.data)
            }).catch((error) => {
              console.log(error)
            })
      },
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