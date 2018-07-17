<template>
    <v-dialog v-model="dialog"
              persistent
              max-width="500px"
              class="avatar-btn-wrap">
        <v-btn slot="activator"
               dark round outline small
               class="avatar-btn">
            <v-avatar
                    :tile=false
                    :size=40>
                <v-icon>{{avatar}}</v-icon>
            </v-avatar>
        </v-btn>
        <SignUpForm v-show="sign"
                    v-on:cancel="canceledDialog"
                    v-on:sign="signin"/>
        <SignInForm v-show="login"
                    v-on:cancel="canceledDialog"
                    v-on:login="receivedLogin"/>
    </v-dialog>
</template>

<script>
  import SignUpForm from './SignUpFormComponent'
  import SignInForm from './SignInFormComponent'
  import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    name: "SignDialogComponent",
    data(){
      return{
        dialog: false,
        sign: true,
        login: false,
        avatar: "person_outline"
      }
    },
    mounted(){
      if(localStorage.getItem('token')!==null){
        this.sign = false
        this.login = true
      }
    },
    methods: {
      canceledDialog(){this.dialog = false},
      signin(){
        this.sign = false
        this.login = true
        this.dialog = false
      },
      receivedLogin(){
        this.avatar = "face"
        this.dialog = false
      },
      ...mapActions([
        'addTokenAction',
        'loginAction'
      ])
    },
    computed: {
      ...mapGetters({
        token: 'tokenGetter',
        isLogin: 'loginGetter'
      }),
      set(value){
        this.addTokenAction(value)
      }
    },
    components: {
      SignInForm,
      SignUpForm
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/signDialog"
</style>