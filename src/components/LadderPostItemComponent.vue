<template>
    <v-flex class="post-wrap">
        <v-text-field
                v-model="modelSubTitle"
                @input="inputSubTitle"
                outline
                :label="'Unitタイトル'+index"
                :rules="[v => !!v || 'Unitタイトルを入力してください']"
                class="post-text-field post-sub-title"
                placeholder="Pythonに触れよう！"/>
        <v-text-field
                v-model="modelUrl"
                @input="inputUrl"
                outline
                :rules="[v => !!v || '参考サイトURLを入力してください',
                         v => /(^http:\/\/|^https:\/\/)\w{1,}/.test(v) || 'http://xxxもしくはhttps://xxxの形式で入力してください']"
                label="参考サイトURL"
                class="post-text-field post-url"
                placeholder="https://www.python.org/"/>
        <v-textarea
                v-model="modelDescription"
                @input="inputDescription"
                outline
                :counter="200"
                :rules="[v => !!v || '学べることを入力してください',
                         v => v.length <= 200 || '学べることは200字以内で入力してください']"
                label="学べること"
                class="post-text-field post-description"
                placeholder="Djangoでアプリケーションをつくるには、Pythonから勉強することが必要です！なので、まずはPythonに触れてプログラミングがどういったものかをProgateで試してみましょう！"/>
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
        testRule: [v => !!v || 'タイトルを入力してください'],
        modelDescription: "",
        modelSubTitle: "",
        modelUrl: "",
        index: this.props.index,
      }
    },
    created() {
      this.modelDescription = this.modelDescription ? this.modelDescription : ""
      this.modelSubTitle = this.modelSubTitle ? this.modelSubTitle : ""
      this.modelUrl = this.modelUrl ? this.modelUrl : ""
    },
    methods: {
      inputSubTitle() {
        this.$emit('sub-title-emit', this.modelSubTitle, this.index)
      },
      inputUrl() {
        this.$emit('url-emit', this.modelUrl, this.index)
      },
      inputDescription() {
        this.$emit('description-emit', this.modelDescription, this.index)
      }
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/ladderPostItem"
</style>