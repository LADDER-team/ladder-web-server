<template>
    <v-layout justify-center
              ref="scrollWrapRef"
              id="scroll-wrap"
              class="layout-ladder-post">
        <v-flex justify-center
                align-start
                class="ladder-posts-wrap">
            <v-text-field
                    v-model="modelTitle"
                    outline
                    class="post-text-field post-title"
                    label="Ladder Title"
                    placeholder="初心者がDjangoアプリケーションを作るまで！"/>
            <v-flex v-for="index in unitIndex" :key="index">
                <LadderPostItem :index="index"
                                @sub-title-emit="onSubTitle"
                                @url-emit="onUrl"
                                @description-emit="onDescription"
                                class="ladder-post-item"/>
            </v-flex>
            <div class="ladder-post-icon" @click="clickUnitAdd" >
                <v-icon size="40">control_point</v-icon>
            </div>
            <v-flex class="ladder-post-btn">
                <v-btn @click="clickLadderPost"
                       dark fab large
                       class="contribution-floating-btn ladder-post-submit">
                    <v-icon dark>done</v-icon>
                </v-btn>
            </v-flex>
        </v-flex>
    </v-layout>
</template>

<script>
  import LadderPostItem from "../components/LadderPostItemComponent"
  import axios from "axios"

  export default {
    name: "LadderPost",
    data(){
      return{
        unitIndex: 1,
        ladderTitle: "",
        modelTitle: "",
        descriptionList: {
          1: "",
        },
        subtitleList: {
          1: "",
        },
        urlList: {
          1: "",
        }
      }
    },
    created(){
      this.modelTitle = this.modelTitle?this.modelTitle:""
    },
    methods: {
      clickUnitAdd(){
        if (this.unitIndex < 8){
          this.unitIndex++;
        }else{
          alert('これ以上ユニットは増やせません！')
        }
      },
      onSubTitle(subTitleEmit, index){
        this.$set(this.subtitleList, index, subTitleEmit);
        console.log(this.subtitleList)
      },
      onUrl(urlEmit){this.url = urlEmit},
      onDescription(descriptionEmit){this.description = descriptionEmit},
      clickLadderPost() {
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/api/ladder/',
          headers: {
            "Accept": "application/json",
            "Authorization": "JWT "+localStorage.getItem("token"),
            "Content-type": "application/json"
          },
          data: {
            title: this.modelTitle,
            units: [
              {
                title: this.subtitle,
                description: this.description,
                url: this.url,
                index: 1
              }
            ]
          }
        }).then(()=>{
          console.log('Posted Ladder!!')
        }).catch((error)=>{
          if (!this.$store.state.isLogin){
            alert('投稿内容が不正です！')
          }
          console.log(error)
          this.$router.push('/')
        })
      }
    },
    components: {
      LadderPostItem
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/ladderPost"
</style>

