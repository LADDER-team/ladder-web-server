<template>
    <v-flex class="post-wrap">
        <v-text-field
                v-model="modelSubTitle"
                @input="inputSubTitle"
                label="Unit Title"
                outline
                class="post-text-field post-sub-title"
                placeholder="1. Pythonに触れよう！"/>
        <v-text-field
                v-model="modelUrl"
                @input="inputUrl"
                label="Image URL"
                outline
                class="post-text-field post-url"
                placeholder="https://example.com"/>
        <v-textarea
                v-model="modelDescription"
                @input="inputDescription"
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
      index: ""
    },
    date() {
      return {
        modelDescription: "",
        modelSubTitle: "",
        modelUrl: ""
      }
    },
    created(){
      this.modelDescription = this.modelDescription?this.modelDescription:""
      this.modelSubTitle = this.modelSubTitle?this.modelSubTitle:""
      this.modelUrl = this.modelUrl?this.modelUrl:""
    },
    methods: {
      inputSubTitle(){this.$emit('subTitleEmit',this.modelSubTitle)},
      inputUrl(){this.$emit('urlEmit', this.modelUrl)},
      inputDescription(){this.$emit('descriptionEmit', this.modelDescription)}
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/ladderPostItem"
</style>