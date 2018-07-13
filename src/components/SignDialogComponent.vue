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
                <v-icon>{{avatar}}</v-icon>
            </v-avatar>
        </v-btn>
        <SignUpForm v-show="isSign"
                    v-on:cancel="canceledDialog"
                    v-on:sign="signin"/>
        <SignInForm v-show="isLogin"
                    v-on:cancel="canceledDialog"
                    v-on:login="receivedLogin"/>
    </v-dialog>
</template>

<script>
  import SignUpForm from './SignUpFormComponent'
  import SignInForm from './SignInFormComponent'

  export default {
    name: "SignDialogComponent",
    data(){
      return{
        dialog: false,
        isSign: true,
        isLogin: false,
        avatar: "person_outline"
      }
    },
    mounted(){
      console.log(this.$store.state.isLogin)
      console.log(this.$store.state.isSign)
    },
    methods: {
      canceledDialog(){this.dialog = false},
      signin(){
        this.isSign = false
        this.isLogin = true
        this.dialog = false
      },
      receivedLogin(){
        this.avatar = "face"
        this.dialog = false
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