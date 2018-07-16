<template>
    <v-flex class="post-wrap">
        <v-text-field
                label="Ladder Title"
                outline
                class="post-text-field post-title"
                placeholder="初心者が簡単なDjangoアプリケーションを作るまで！"/>
        <v-text-field
                label="Unit Title"
                outline
                class="post-text-field post-sub-title"
                placeholder="1. Pythonに触れよう！"/>
        <v-text-field
                label="Image URL"
                outline
                class="post-text-field post-url"
                placeholder="https://example.com（ごめんなさい！入力しても画像は初期のものになります！）"/>
        <v-textarea
                label="Description"
                outline
                class="post-text-field post-description"
                placeholder="DjangoでWebアプリケーションをつくるには、Pythonから勉強することが必要です！なので、まずはPythonに触れてプログラミングがどういったものかをProgateで試してみましょう！"/>

    </v-flex>
</template>

<script>
  export default {
    name: "LadderPostItemComponent",
    props: {
      title: ''
    },
    date(){
      return{
      }
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/ladderPostItem"
</style>