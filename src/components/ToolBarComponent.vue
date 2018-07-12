<template>
    <v-toolbar class="g-toolbar" fixed align-center>
        <h1 class="g-toolbar-title">
            <router-link :to="{name: 'list'}">
                <img src="../assets/img/logo_title.png" class="g-toolbar-logo">
            </router-link>
        </h1>
        <v-flex xs5 sm4 md2 class="g-search-wrap">
            <v-text-field
                    class="g-search-field"
                    name="input-1"
                    rows=1
                    prepend-icon="search"
                    hide-details/>
        </v-flex>
        <v-spacer/>
        <v-toolbar-items class="hidden-sm-and-down avatar align-center">
            <router-link :to="{name: 'post'}">
                <v-btn class="contribution-btn"
                       depressed
                       ripple
                >投稿する</v-btn>
            </router-link>
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
                                <router-link :to="{name: 'list'}">ログイン</router-link>
                                してください
                            </p>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="dialog = false">キャンセル</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="postUser">登録</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
  import axios from 'axios'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    name: "toolbar-component",
    data(){
      return{
        dialog: false,
        modelName: null,
        modelEmail: null,
        modelPass: null,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    },
    mounted(){
      // const registration = JSON.stringify(this.registration)
    },
    methods: {
      addUser(){
        this.addNameAction(this.$refs.nameRef.value),
        this.addEmailAction(this.$refs.emailRef.value),
        this.addPassAction(this.$refs.passRef.value)
      },
      postUser() {
        this.addUser()
        axios.post('/api/users/',
            {
              name: this.$store.state.name,
              email: this.$store.state.email,
              password: this.$store.state.password,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
            .then((response) => {
              console.log(response.data)
              this.$router.push('/')
            })
            .catch((error) => {
              console.log(error)
            })
        this.dialog = false
      },
      ...mapActions(['addNameAction','addEmailAction','addPassAction'])
    },
    computed: {
        ...mapGetters({
          name: 'nameGetter',
          email: 'emailGetter',
          password: 'passGetter'
        }),
        set(value){
          this.addNameAction(value),
          this.addEmailAction(value),
          this.addPassAction(value)
        },
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/toolbar"
</style>