<template>
    <v-dialog v-model="dialog"
              persistent
              max-width="500px"
              class="avatar-btn-wrap">
        <v-btn slot="activator"
               dark
               round
               outline
               small
               class="avatar-btn">
            <v-avatar
                    :tile=false
                    :size=40>
                <v-icon class="avatar-icon">person_outline</v-icon>
            </v-avatar>
        </v-btn>
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
                    <p class="dialog-help">
                        未登録の方はこちらから
                        <router-link :to="{name: 'list'}">登録</router-link>
                        してください
                    </p>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialog = false">キャンセル</v-btn>
                <v-btn color="blue darken-1" flat @click.native="postUser">ログイン</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import axios from 'axios'

  export default {
    name: "SignUpDialogComponent",
    data(){
      return{
        dialog: false,
        modelEmail: null,
        modelPass: null,
        loginToken: null,
        login: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    },
    mounted(){
      // const registration = JSON.stringify(this.registration)
    },
    methods: {
      loginUser(){
        this.loginEmailAction(this.$refs.emailRef.value),
        this.loginPassAction(this.$refs.passRef.value)
      },
      addToken(){
        this.addTokenAction(this.loginToken)
      },
      loginPromise(){
        this.loginAction(this.login)
      },
      postUser() {
        this.loginUser()
        axios.post('/api/api-auth/',
            {
              email: this.$store.state.email,
              password: this.$store.state.password,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((response) => {
                console.log(response.data)
                this.loginToken = response.data.token
            }).then(()=>{
                this.addToken()
            }).then(() => {
                if (!this.login && this.loginToken === this.$store.state.token){
                  this.login = true
                }
            }).then(() => {
                this.loginPromise()
            }).catch((error) => {
                console.log(error)
            })

        console.log(this.$store.state)
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
    @import "../styles/toolbar"
</style>