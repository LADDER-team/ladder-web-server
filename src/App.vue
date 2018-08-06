<template>
    <v-app id="inspire" indig>
        <FirstChartTab/>
        <ToolBar/>
        <v-content id="window">
            <v-container
                    fluid
                    fill-height
                    justify-center
                    align-start
                    class="g-container">
                <transition name="root">
                    <router-view/>
                </transition>
            </v-container>
        </v-content>
        <Footer/>
    </v-app>
</template>
<script>
  import FirstChartTab from './components/FirstChartComponent'
  import Footer from './components/FooterComponent'
  import LadderList from './Views/LadderListPage'
  import ToolBar from './components/ToolBarComponent'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import axios from 'axios'
  import jwt from 'jwt-decode'

  export default {
    name: 'Ladder',
    data: () => ({
      drawer: true,
      right: true,
      clipped: false,
      fixed: false,
      miniVariant: false,
      rightDrawer: false,
      text: "ラダーの使い方！",
      loginToken: null,
      login: false,
      temporaryUserId: 0,
      userDetail: {},
      decodedToken: {},
    }),
    components: {
      FirstChartTab,
      Footer,
      LadderList,
      ToolBar
    },
    mounted() {
      if (localStorage.getItem('token')) {
        this.loginToken = localStorage.getItem('token')
        this.autoAuth()
      }
    },
    methods: {
      autoAuth() {
        let login = new Promise((resolve, reject) => {
          resolve('Login');
        })
        login.then(() => {
          this.addToken()
        }).then(() => {
          if(!this.$store.state.isLogin){
            this.login = true
            this.loginPromise()
          }
        }).then(() => {
          this.tokenDecoded()
        }).then(() => {
          this.getUser()
        }).then(() => {
          this.setUser()
        }).catch((error) => {
          console.log(error)
        })
      },
      addToken() {
        this.addTokenAction(this.loginToken)
      },
      loginPromise() {
        this.loginAction(this.login)
      },
      tokenDecoded() {
        this.decodedToken = jwt(this.loginToken);
        this.temporaryUserId = this.decodedToken.user_id;
      },
      getUser() {
        axios({
          method: 'GET',
          url: 'https://api.ladder.noframeschools.com/api/users/' + this.temporaryUserId + '/',
        }).then((response) => {
          this.userDetail = response.data
        }).then(() => {
          this.setUser()
          console.log(this.$store.state)
        }).catch((error) => {
          alert("ユーザの取得に失敗しました")
          console.log(error)
        })
      },
      setUser() {
        this.addNameAction(this.userDetail.name);
        this.addEmailAction(this.decodedToken.email);
        this.addUserIdAction(this.temporaryUserId);
      },
      clickDialogCancel() {
        this.$emit('cancel')
      },
      ...mapActions([
        'addEmailAction',
        'addNameAction',
        'addTokenAction',
        'addUserIdAction',
        'loginAction',
      ])
    }
  }
</script>
<style scoped lang="sass">
    @import "./styles/base"
</style>
