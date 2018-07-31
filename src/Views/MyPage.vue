<template>
    <v-layout align-center justify-center column
              class="layout-my-page">
        <div class="my-page-wrap">
            <v-flex md3 align-center justify-center layout>
                <v-avatar :size="avatarSize" color="grey lighten-4">
                    <img src="../assets/img/logo.png" alt="avatar">
                </v-avatar>
            </v-flex>
            <v-flex md9 justify-start align-center>
                <h2>{{compUser}}</h2>
                <p>{{compProfile}}</p>
            </v-flex>
        </div>
        <v-flex align-start　justify-center
                class="ladder-links-wrap my-page-ladders-wrap">
            <h2 class="my-page-ladders-title">投稿したLadder</h2>
            <div v-for="ladder in myLadderList"
                 class="ladder-link-wrap">
                <router-link :to="`/detail/${ ladder.id }`"
                             class="ladder-link">
                    <div class="ladder-thumb-wrap">
                        <img :alt="defaultImage.alt"
                             src="../assets/img/ladder_avatar.png"
                             class="ladder-thumb">
                    </div>
                    <div class="ladder-info-wrap">
                        <h2 class="ladder-link-title">{{ ladder.title }}</h2>
                    </div>
                </router-link>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "MyPage",
    data() {
      return {
        avatarSize: 80,
        defaultUsername: 'ユーザー',
        defaultProfile: 'プロフィール文',
        userId: 0,
        defaultImage: {
          src: "http://via.placeholder.com/350x150",
          alt: "placeholder-image"
        },
        myLadderList: []
      }
    },
    mounted() {
      this.userId = this.$store.state.userId?this.$store.state.userId:0
      axios({
        method: 'GET',
        url: 'https://api.ladder.noframeschools.com/api/users/'+this.userId+'/'
      }).then((response) => {
        this.myLadderList = response.data.my_ladders
      }).catch((error) => {
        console.log(error)
      })
    },
    computed: {
      compUser() {
        if (this.$store.state.name) {
          return this.$store.state.name
        } else {
          return this.defaultUsername
        }
      },
      compProfile() {
        if (this.$store.state.profile) {
          return this.$store.state.profile
        } else {
          return this.defaultProfile
        }
      }
    },
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/myPage"
    @import "../styles/ladderList"
</style>