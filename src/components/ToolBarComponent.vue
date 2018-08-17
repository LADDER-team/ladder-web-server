<template>
    <v-toolbar class="g-toolbar" fixed align-center>
        <h1 class="g-toolbar-title">
            <router-link :to="{name: 'list'}">
                <img src="../assets/img/logo_title.png" class="g-toolbar-logo">
            </router-link>
        </h1>
        <v-flex xs5 sm4 md2 class="g-search-wrap">
            <v-text-field hide-details
                          name="input-1"
                          prepend-icon="search"
                          rows=1
                          class="g-search-field"/>
        </v-flex>
        <v-spacer/>
        <v-toolbar-items class="hidden-sm-and-down avatar align-center">
            <v-btn depressed ripple
                   @click="clickToLadderPost"
                   class="primary-btn">
                投稿する
            </v-btn>
            <v-btn slot="activator"
                   dark round outline small
                   @click="clickToLadderManagement"
                   class="avatar-btn g-toolbar-btn">
                <v-avatar :tile=false :size=40>
                    <img class="g-toolbar-btn-icon"
                         src="../assets/img/ladder_icon_white.png"
                         alt="">
                </v-avatar>
            </v-btn>
            <SignDialog/>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
  import SignDialog from '../components/SignDialogComponent'
  import {mapGetters} from 'vuex'

  export default {
    name: "toolbar-component",
    data() {
      return {
        avatarPath: '',
      }
    },
    methods: {
      clickToLadderPost() {
        if (this.isLogin) {
          this.$router.push('/post')
        } else {
          alert("投稿ですか？まずはログインしてください！")
        }
      },
      clickToLadderManagement() {
        if (this.isLogin) {
          this.$router.push('/user/' + this.userId + '/ladders/')
        } else {
          alert("投稿ですか？まずはログインしてください！")
        }
      }
    },
    computed: {
      ...mapGetters({
        isLogin: 'loginGetter',
        userId: 'userIdGetter'
      })
    },
    components: {
      SignDialog
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/toolbar"
</style>