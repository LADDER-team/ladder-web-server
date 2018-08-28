<template>
    <v-layout align-center justify-start column
              class="layout-my-page">
        <div class="my-page-wrap">
            <v-flex align-center justify-end layout
                    class="my-page-avatar">
                <v-avatar :size="avatarSize" color="grey lighten-4">
                    <img src="../assets/img/logo.png" alt="avatar">
                </v-avatar>
            </v-flex>
            <v-flex justify-start align-center>
                <h2 class="display-1">{{compUser}}</h2>
                <v-btn depressed ripple
                       @click="unimplemented"
                       class="primary-btn">
                    プロフィールを編集
                </v-btn>
            </v-flex>
        </div>
        <v-tabs slot="extension"
                v-model="model"
                centered
                color="white"
                slider-color="blue"
                class="my-page-tabs">
            <v-tab href="#tab-1" class="my-page-tab">プロフィール</v-tab>
            <v-tab href="#tab-2" class="my-page-tab">投稿Ladder</v-tab>
        </v-tabs>
        <v-tabs-items v-model="model" class="my-page-tab-items">
            <v-tab-item id="tab-1" class="my-page-tab-item my-page-profile">
                <v-flex>
                    <div>
                        <h3 class="my-page-profile-title">自己紹介</h3>
                        <p>これはプロフィールの例文になります！こんにちは！ここは{{compUser}}のマイページです！今後たくさんの機能が追加予定ですので楽しみにしていてくださいね！</p>
                    </div>
                </v-flex>
            </v-tab-item>
            <v-tab-item id="tab-2" class="my-page-tab-item">
                <p v-show="!posted" class="my-page-not-ladder">投稿したLadderがありません</p>
                <v-flex align-start　justify-center
                        class="ladder-links-wrap my-page-ladders-wrap">
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
            </v-tab-item>
        </v-tabs-items>
    </v-layout>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'

  export default {
    name: "MyPage",
    data() {
      return {
        posted: false,
        avatarSize: 100,
        defaultUsername: 'ユーザー',
        model: 'tab-1',
        profile: '',
        defaultImage: {
          src: "http://via.placeholder.com/350x150",
          alt: "placeholder-image"
        },
        myLadderList: [],
      }
    },
    mounted() {
      this.userId = this.$store.state.userId ? this.$store.state.userId : 0
      axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/users/' + this.userId + '/'
      }).then((response) => {
        this.myLadderList = response.data.my_ladders
        this.posted = response.data.my_ladders.length!==0
      }).catch((error) => {
        console.log(error)
      })
    },
    methods: {
      unimplemented() {
        alert("機能搭載までお待ちください！")
      },
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
      },
      ...mapGetters({
        userId: 'userIdGetter',
        isLogin: 'loginGetter'
      })
    },
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/myPage"
    @import "../styles/ladderList"
</style>