<template>
    <v-layout align-center justify-start column
              class="layout-ladder-management">
        <v-tabs slot="extension"
                v-model="model"
                centered
                color="white"
                slider-color="blue"
                class="my-page-tabs">
            <v-tab href="#tab-1" class="my-page-tab">学習中 Ladder</v-tab>
            <v-tab href="#tab-2" class="my-page-tab">学習済 Ladder</v-tab>
            <v-tab href="#tab-3" class="my-page-tab">投稿 Ladder</v-tab>
        </v-tabs>
        <v-tabs-items v-model="model" class="my-page-tab-items">
            <v-tab-item id="tab-1" class="my-page-tab-item">
                <p v-show="!learningLadderList.length" class="my-page-not-ladder">投稿したLadderがありません</p>
                <v-flex align-start　justify-center
                        class="ladder-links-wrap my-page-ladders-wrap">
                    <div v-for="(ladder, key) in learningLadderList"
                         class="ladder-link-wrap">
                        <router-link :to="`/detail/${ ladder.id }`"
                                     class="ladder-link">
                            <div class="ladder-thumb-wrap">
                                <img :alt="defaultImage.alt+'-'+key"
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
            <v-tab-item id="tab-2" class="my-page-tab-item">
                <p v-show="!finishLadderList.length" class="my-page-not-ladder">学習済みのLadderがありません</p>
                <v-flex align-start　justify-center
                        class="ladder-links-wrap my-page-ladders-wrap">
                    <div v-for="ladder in finishLadderList"
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
            <v-tab-item id="tab-3" class="my-page-tab-item">
                <p v-show="!myLadderList.length" class="my-page-not-ladder">投稿したLadderがありません</p>
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
    name: "LadderManagementPage",
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
        learningLadderList: [],
        myLadderList: [],
        finishLadderList: []
      }
    },
    created() {
      setTimeout(() => {
        this.getMyLadders()
        this.getFinishLadders()
        this.getLearningLadders()
      }, 100)
    },
    methods: {
      unimplemented() {
        alert("機能搭載までお待ちください！")
      },
      getMyLadders(){
        axios({
          method: 'GET',
          url: 'https://api.ladder.noframeschools.com/api/users/' + this.userId + '/'
        }).then((response) => {
          this.myLadderList = response.data.my_ladders
        }).catch((error) => {
          console.log(error)
        })
      },
      getFinishLadders(){
        axios({
          method: 'GET',
          url: 'https://api.ladder.noframeschools.com/api/users/' + this.userId + '/finish-ladder/'
        }).then((response) => {
          this.finishLadderList = response.data
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
        })
      },
      getLearningLadders(){
        console.log(this.userId)
        axios({
          method: 'GET',
          url: 'https://api.ladder.noframeschools.com/api/users/' + this.userId + '/learning-ladder/'
        }).then((response) => {
          this.learningLadderList = response.data
        }).catch((error) => {
          console.log(error)
        })
      }
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
    @import "../styles/ladderList"
    @import "../styles/ladderManagement"
</style>