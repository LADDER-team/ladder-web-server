<template>
    <v-card>
        <v-card-title>
            <span class="headline">ユーザ登録</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                        <v-text-field v-model="modelName"
                                      ref="nameRef"
                                      label="user"
                                      required></v-text-field>
                    </v-flex>
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
                    登録済みの方はこちらから
                    <a href="#" @click="clickDirectLogin">ログイン</a>
                    してください
                </p>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat
                   @click="cancelDialog">キャンセル</v-btn>
            <v-btn color="blue darken-1" flat
                   @click.native="postUser">登録</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    import axios from 'axios'

    export default {
    name: "SignUpFormComponent",
    data(){
      return{
        modelName: null,
        modelEmail: null,
        modelPass: null,
        sign: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    },
    mounted(){
      // const registration = JSON.stringify(this.registration)
    },
    methods: {
      cancelDialog(){this.$emit('cancel')},
      clickDirectLogin(){
        this.$emit('direct-login');
      },
      addUser(){
        this.addNameAction(this.$refs.nameRef.value),
        this.addEmailAction(this.$refs.emailRef.value),
        this.addPassAction(this.$refs.passRef.value)
      },
      addSign(){this.signAction(this.sign)},
      sendToSign(){
        this.$emit('sign')
      },
      postUser() {
        this.addUser()
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
        }).then(()=>{
          this.$data.sign = true
        }).then(()=>{
          this.addSign()
        }).then(()=>{
          this.sendToSign()
          this.$router.push('/')
        }).catch((error) => {
          console.log(error)
        })
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
      set(value){
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