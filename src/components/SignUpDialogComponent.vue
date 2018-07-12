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
</template>

<script>
    import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    import axios from 'axios'

    export default {
    name: "SignUpDialogComponent",
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
              this.dialog = false
              this.$router.push('/')
            })
            .catch((error) => {
              console.log(error)
            })
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