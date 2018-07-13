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
                <v-icon>person_outline</v-icon>
            </v-avatar>
        </v-btn>
        <!--<SignUpForm v-on:cancel="canceledDialog"/>-->
        <SignInForm v-on:cancel="canceledDialog"/>
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
      }
    },
    methods: {canceledDialog(){this.dialog = false}},
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