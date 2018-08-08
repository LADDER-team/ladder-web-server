<template>
    <v-dialog v-model="dialog"
              persistent
              max-width="500px"
              class="avatar-btn-wrap">
        <v-btn slot="activator"
               dark round outline small
               class="avatar-btn">
            <v-avatar :tile=false :size=40>
                <v-icon>{{switchedAvatar}}</v-icon>
            </v-avatar>
        </v-btn>
        <transition name="sign-up">
            <SignUpForm v-show="sign&&!this.$store.state.isLogin"
                        v-on:cancel="onCancelDialog"
                        v-on:direct-login="onDirectLogin"
                        v-on:sign="signin"
                        v-on:login="receivedLogin"/>
        </transition>
        <transition name="sign-in">
            <SignInForm v-show="login&&!this.$store.state.isLogin"
                        v-on:cancel="onSignInDialog"
                        v-on:login="receivedLogin"/>
        </transition>
        <UserInfoCard v-show="this.$store.state.isLogin"
                      v-on:cancel="onCancelDialog"/>
    </v-dialog>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import SignUpForm from './SignUpFormComponent'
  import SignInForm from './SignInFormComponent'
  import UserInfoCard from './UserInfoCardComponent'

  export default {
    name: "SignDialogComponent",
    data() {
      return {
        sign: true,
        dialog: false,
        login: false,
        avatar: "person_outline",
      }
    },
    mounted() {
      if (this.isLogin) {
        this.sign = false;
      }
    },
    methods: {
      onSignInDialog() {
        this.dialog = false
        setTimeout(() => {
          this.login = false
          this.sign = true
        }, 200)
      },
      onCancelDialog() {
        this.dialog = false
      },
      onDirectLogin() {
        this.sign = false
        setTimeout(() => {
          this.login = true
        }, 100)
      },
      signin() {
        this.dialog = false
        this.login = true
        this.sign = false
      },
      receivedLogin() {
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
      set(value) {
        this.addTokenAction(value)
      },
      switchedAvatar() {
        return this.isLogin ? "face" : "person_outline";
      },
    },
    components: {
      SignInForm,
      SignUpForm,
      UserInfoCard
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/signDialog"
</style>