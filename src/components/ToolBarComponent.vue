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
            <v-flex
                xs12
                sm6
                md8
                text-xs-center
                layout
                align-center
                justify-center
                class="avatar-wrap">
                <router-link :to="{name: 'list'}">
                    <v-avatar
                        :tile=false
                        :size=40
                        color="">
                        <v-icon dark class="avatar-icon">person_outline</v-icon>
                    </v-avatar>
                </router-link>
            </v-flex>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
  export default {
    name: "toolbar-component"
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/colors"
    @import "../styles/toolbar"
</style>