<template>
    <v-toolbar class="g-toolbar" fixed align-center>
        <h1 class="g-toolbar-title">
            <router-link :to="{name: 'list'}">
                <img src="../assets/img/logo_title.png" class="g-toolbar-logo">
            </router-link>
        </h1>
        <v-flex xs5 sm4 md2 class="g-search-wrap">
            <v-text-field hide-details
                          name="input-1"
                          prepend-icon="search"
                          rows=1
                          class="g-search-field"/>
        </v-flex>
        <v-spacer/>
        <v-toolbar-items class="hidden-sm-and-down avatar align-center"@click="clickContribute">
            <router-link :to="{name: 'post'}">
                <v-btn depressed ripple
                       class="contribution-btn">
                    投稿する</v-btn>
            </router-link>
            <SignDialog/>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
  import SignDialog from '../components/SignDialogComponent'

  export default {
    name: "toolbar-component",
    data(){
      return{
        avatarPath: '',
      }
    },
    methods: {
      clickContribute(){
      }
    },
    components: {
      SignDialog,
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/toolbar"
</style>