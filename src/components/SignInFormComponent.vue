<template>
    <v-card>
        <v-card-title>
            <span class="headline">ユーザログイン</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-form ref="form" v-model="valid"
                            lazy-validation
                            class="sign-in-form">
                        <v-text-field
                                v-model="modelEmail"
                                :rules="emailRules"
                                ref="emailRef"
                                label="メールアドレス"
                                required
                        />
                        <v-text-field
                                v-model="modelPass"
                                :rules="passRules"
                                ref="passRef"
                                type="password"
                                label="パスワード"
                                required/>
                    </v-form>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat　color="blue darken-1"
                   @click="clickDialogCancel">キャンセル
            </v-btn>
            <v-btn flat　color="blue darken-1"
                   @click.native="clickLoginPost">ログイン
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import axios from 'axios'

  export default {
    name: "SignInFormComponent",
    data() {
      return {
        loginToken: null,
        login: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        //validation
        valid: true,
        modelEmail: "",
        emailRules: [
          v => !!v || 'メールアドレスを入力してください',
          v => /.+@.+/.test(v) || '正しいメールアドレスを入力してください'
        ],
        modelPass: "",
        passRules: [v => !!v || 'パスワードを入力してください',],
      }
    },
    methods: {
      clickDialogCancel() {
        this.$emit('cancel')
      },
      sendLogin() {
        this.$emit('login')
      },
      loginUser() {
        this.loginEmailAction(this.$refs.emailRef.value)
        this.loginPassAction(this.$refs.passRef.value)
      },
      addToken() {
        this.addTokenAction(this.loginToken)
      },
      loginPromise() {
        this.loginAction(this.login)
      },
      clickLoginPost() {
        this.loginUser()
        if (this.$refs.form.validate()) {
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
          }).then((response) => {
            this.loginToken = JSON.stringify(response.data.token).replace(/[\"]/g, "")
            this.addToken()
          }).then(() => {
            this.login = !this.$store.state.isLogin ? true : alert("ログイン済みです")
          }).then(() => {
            if (!this.$store.state.isLogin) {
              this.loginPromise()
              alert("ログインしました！")
            }
          }).then(() => {
            this.sendLogin()
          }).catch((error) => {
            console.log(error)
          })
        }
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
      set(value) {
        this.loginEmailAction(value)
        this.loginPassAction(value)
        this.addTokenAction(value)
      },
    },
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/signInForm"
</style>