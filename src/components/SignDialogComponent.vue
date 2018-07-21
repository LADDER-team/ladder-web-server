<template>
    <v-dialog v-model="dialog"
              persistent
              max-width="500px"
              class="avatar-btn-wrap">
        <v-btn slot="activator"
               dark round outline small
               class="avatar-btn">
            <v-avatar :tile=false :size=40>
                <v-icon>{{avatar}}</v-icon>
            </v-avatar>
        </v-btn>
        <transition name="sign-up">
            <SignUpForm v-show="sign"
                        v-on:cancel="onSignUpDialog"
                        v-on:direct-login="onDirectLogin"
                        v-on:sign="signin"/>
        </transition>
        <transition name="sign-in">
            <SignInForm v-show="login"
                        v-on:cancel="onSignInDialog"
                        v-on:login="receivedLogin"/>
        </transition>
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
        sign: true,
        dialog: false,
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
      onSignInDialog(){
        this.dialog = false
        setTimeout(()=>{
          this.login = false
          this.sign = true
        },200)
      },
      onSignUpDialog(){this.dialog = false},
      onDirectLogin(){
        this.sign = false
        setTimeout(()=>{
          this.login = true
        }, 100)
      },
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