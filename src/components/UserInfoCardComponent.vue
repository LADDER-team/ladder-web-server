<template>
    <v-card>
        <v-card-title class="user-info-title">
            <span class="headline">{{compUser}}さん</span>
        </v-card-title>
        <v-card-text class="user-info-link">
            <v-btn small @click="clickDialogCancel()" class="link-btn">
                <router-link :to="`/user/${compUser}`">マイページへ</router-link>
            </v-btn>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat　color="blue darken-1"
                   @click="clickDialogCancel">キャンセル
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
  export default {
    name: "UserInfoCardComponent",
    data() {
      return {
        userInfoName: 'ユーザー',
      }
    },
    methods: {
      clickDialogCancel() {
        this.$emit('cancel')
      }
    },
    computed: {
      compUser() {
        if (this.$store.state.name) {
          return this.$store.state.name
        } else {
          return this.userInfoName
        }
      }
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/userInfoCard"
</style>