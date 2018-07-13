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
      postUnit(token){
        axios.post('/api/ladder/unit/',
            {
              id: 1,
              title: 'テスト',
              description: 'テスト',
              ladder: 'テスト',
              url: 'http://test.com',
              index: 1,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'JWT ' + token
              }
            }).then((response)=>{
              console.log(response.data)
            }).catch((error) => {
              console.log(error)
            })
      },
       postLadder(){
         let token = this.$store.state.token
         token = token.replace(/[\"]/g,"")
         console.log('JWT '+token)

         axios.post('/api/ladder',
             {
               title: 'テスト',
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
                 'Authorization' : 'JWT '+ token
               }
             }).then(()=>{
                this.postUnit(token)
             }).then((response)=>{
               console.log(response.data)
             }).catch((error) => {
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