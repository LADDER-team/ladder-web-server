<template>
    <v-layout align-start justify-center wrap
              class="layout-my-page">
        <v-flex>
            <v-flex align-center justify-center
                    layout text-xs-center>
                <v-avatar
                        :tile="tile"
                        :size="avatarSize"
                        color="grey lighten-4">
                    <img src="../assets/img/logo.png" alt="avatar">
                </v-avatar>
            </v-flex>
        </v-flex>
        <v-flex>
            <h2></h2>
            <p></p>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: "MyPage",
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/myPage"
</style>