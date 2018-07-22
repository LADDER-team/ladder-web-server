<template>
    <v-card>
        <v-card-title>
            <span class="headline">ユーザ登録</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-form ref="form" v-model="valid"
                            lazy-validation
                            class="sign-up-form">
                        <v-text-field
                                v-model="modelName"
                                :rules="nameRules"
                                label="名前"
                                ref="nameRef"
                                required/>
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
                        <v-text-field
                                v-model="modelConfirm"
                                :rules="confirmRules"
                                type="password"
                                label="パスワード（再確認）"
                                required/>
                    </v-form>
                </v-layout>
                <p class="dialog-help">
                    登録済みの方はこちらから
                    <a href="#" @click="clickDirectLogin">ログイン</a>
                    してください
                </p>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat
                   @click="cancelDialog">キャンセル
            </v-btn>
            <v-btn :disabled="!valid"
                   color="blue darken-1" flat
                   @click="postUser">登録
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import axios from 'axios'

  export default {
    name: "SignUpFormComponent",
    data() {
      return {
        sign: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        valid: true,
        modelName: "",
        nameRules: [v => !!v || '名前を入力してください'],
        //validation
        modelEmail: "",
        emailRules: [
          v => !!v || 'メールアドレスを入力してください',
          v => /.+@.+/.test(v) || '正しいメールアドレスを入力してください'
        ],
        modelPass: "",
        passRules: [
          v => !!v || 'パスワードを入力してください',
          v => (v && v.length >= 8) || 'パスワードは8文字以上で入力してください'
        ],
        modelConfirm: "",
        confirmRules: [
          v => !!v || 'パスワードを入力してください',
          v => (v === this.modelPass) || 'パスワードが一致しません'
        ]
      }
    },
    methods: {
      cancelDialog() {
        this.$emit('cancel')
      },
      clickDirectLogin() {
        this.$emit('direct-login');
      },
      addUser() {
        this.addNameAction(this.$refs.nameRef.value),
            this.addEmailAction(this.$refs.emailRef.value),
            this.addPassAction(this.$refs.passRef.value)
      },
      addSign() {
        this.signAction(this.sign)
      },
      sendToSign() {
        this.$emit('sign')
      },
      postUser() {
        console.log(this.$refs.form.validate())
        this.addUser()
        if (this.$refs.form.validate()) {
          axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/users/',
            headers: {
              "Accept": "application/json",
              'Content-Type': 'application/json',
            },
            data: {
              name: this.$store.state.name,
              email: this.$store.state.email,
              password: this.$store.state.password
            }
          }).then(() => {
            this.$data.sign = true
          }).then(() => {
            this.addSign()
          }).then(() => {
            this.sendToSign()
            this.$router.push('/')
          }).catch((error) => {
            alert("登録に失敗しました")
            console.log(error)
          })
        }
      },
      ...mapActions([
        'addNameAction',
        'addEmailAction',
        'addPassAction',
        'signAction'
      ])
    },
    computed: {
      ...mapGetters({
        name: 'nameGetter',
        email: 'emailGetter',
        password: 'passGetter',
        isSign: 'signGetter'
      }),
      set(value) {
        this.addNameAction(value),
            this.addEmailAction(value),
            this.addPassAction(value),
            this.signAction(value)
      },
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/signUpForm"
</style>