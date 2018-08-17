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
  import jwt from 'jwt-decode'

  export default {
    name: "SignInFormComponent",
    data() {
      return {
        loginToken: null,
        login: false,
        temporaryUserId: 0,
        userDetail: {},
        decodedToken: {},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
      clickLoginPost() {
        if (this.$refs.form.validate()) {
          axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/api-auth/',
            headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json'
            },
            data: {
              email: this.modelEmail,
              password: this.modelPass
            }
          }).then((response) => {
            this.loginToken = JSON.stringify(response.data.token).replace(/[\"]/g, "");
            this.addToken();
          }).then(() => {
            this.login = !this.$store.state.isLogin ? true : alert("ログイン済みです")
          }).then(() => {
            this.emitLogin()
            alert("ログインしました！")
            if (!this.$store.state.isLogin) {
              setTimeout(()=>{
                this.loginPromise()
              }, 200)
            }
          }).then(() => {
            this.tokenDecoded()
          }).then(() => {
            this.getUser()
          }).catch((error) => {
            alert('ログインに失敗しました！')
            console.log(error)
          })
        }
      },
      addToken() {
        this.addTokenAction(this.loginToken)
      },
      loginPromise() {
        this.loginAction(this.login)
      },
      emitLogin() {
        this.$emit('login')
      },
      tokenDecoded() {
        this.decodedToken = jwt(this.loginToken);
        this.temporaryUserId = this.decodedToken.user_id;
      },
      getUser() {
        axios({
          method: 'GET',
          url: 'http://127.0.0.1:8000/api/users/' + this.temporaryUserId + '/',
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
    },
    computed: {
      ...mapGetters({
        email: 'emailGetter',
        isLogin: 'loginGetter',
        password: 'passGetter',
        token: 'tokenGetter',
        userId: 'userIdGetter'
      }),
      set(value) {
        this.addTokenAction(value)
        this.addUserIdAction(value)
      },
    },
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/signInForm"
</style>