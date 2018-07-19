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
        unit: [],
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
      onDescription(descriptionEmit, index){this.$set(this.descriptionList, index, descriptionEmit);},
      onSubTitle(subTitleEmit, index){this.$set(this.subtitleList, index, subTitleEmit);},
      onUrl(urlEmit, index){this.$set(this.urlList, index, urlEmit);},
      clickLadderPost() {
        for (let i=1;i<=this.unitIndex;i++){
            this.unit[i-1] =
                {
                  title: this.subtitleList[i],
                  description: this.descriptionList[i],
                  url: this.urlList[i],
                  index: i
                }
        }
        let unit = JSON.stringify(this.unit)
        unit = JSON.parse(unit)

        axios({
          method: 'POST',
          url: 'https://api.ladder.noframeschools.com/api/ladder/',
          headers: {
            "Accept": "application/json",
            "Authorization": "JWT "+this.$store.state.token,
            "Content-type": "application/json"
          },
          data: {
            title: this.modelTitle,
            units: unit
          }
        }).then(()=>{
          alert('ラダーを投稿しました！トップページへ遷移します！')
          this.$router.push('/')
        }).catch((error)=>{
          if (!this.$store.state.isLogin){
            alert('ログインしてください！')
          }else{
            alert('投稿に失敗しました！')
          }
          console.log(error)
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

