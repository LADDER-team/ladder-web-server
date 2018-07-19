<template>
    <v-card>
        <v-card-title>
            <span class="headline">ユーザログイン</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field v-model="modelEmail"
                                      ref="emailRef"
                                      label="Email"
                                      required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="modelPass"
                                      ref="passRef"
                                      label="Password"
                                      type="password"
                                      required></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat　color="blue darken-1"
                   @click="clickDialogCancel">キャンセル</v-btn>
            <v-btn flat　color="blue darken-1"
                   @click.native="clickLoginPost">ログイン</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import axios from 'axios'

  export default {
    name: "SignInFormComponent",
    data(){
      return{
        modelEmail: null,
        modelPass: null,
        loginToken: null,
        login: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    },
    methods: {
      clickDialogCancel(){this.$emit('cancel')},
      sendLogin(){this.$emit('login')},
      loginUser(){
        this.loginEmailAction(this.$refs.emailRef.value),
        this.loginPassAction(this.$refs.passRef.value)
      },
      addToken(){
        this.addTokenAction(this.loginToken)
      },
      loginPromise(){this.loginAction(this.login)},
      clickLoginPost() {
        this.loginUser()
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/api/api-auth/',
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
          },
          data: {
            email: this.$store.state.email,
            password: this.$store.state.password
          }
        }).then((response)=>{
          this.loginToken = JSON.stringify(response.data.token).replace(/[\"]/g,"")
          this.addToken()
        }).then(() => {
          if (!this.login){this.login = true}
        }).then(() => {
          this.loginPromise()
        }).then(()=>{
          this.sendLogin()
          this.$router.push('/')
        }).catch((error) => {
          console.log(error)
        })
      },
      ...mapActions([
        'loginEmailAction',
        'loginPassAction',
        'addTokenAction',
        'loginAction'
      ])
    },
    computed: {
      ...mapGetters({
        email: 'emailGetter',
        password: 'passGetter',
        token: 'tokenGetter',
        isLogin: 'loginGetter'
      }),
      set(value){
        this.loginEmailAction(value),
        this.loginPassAction(value),
        this.addTokenAction(value)
      },
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/signInForm"
</style>