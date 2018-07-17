<template>
    <v-layout justify-center class="layout-ladder-post">
        <v-flex justify-center
                align-start
                class="ladder-posts-wrap">
            <v-text-field
                    v-model="modelTitle"
                    label="Ladder Title"
                    outline
                    class="post-text-field post-title"
                    placeholder="初心者がDjangoアプリケーションを作るまで！"/>
            <v-flex v-for="n in unitIndex" :key="n">
                <LadderPostItem :index="n"
                                v-on:subTitleEmit="onSubTitle"
                                v-on:urlEmit="onUrl"
                                v-on:descriptionEmit="onDescription"/>
            </v-flex>
            <div class="ladder-post-icon" @click="addUnit" >
                <v-icon size="40">control_point</v-icon>
            </div>
            <v-flex class="ladder-post-btn">
                <v-btn @click="postLadder"
                       dark fab large
                       class="contribution-floating-btn ladder-post-submit">
                    <v-icon dark >done</v-icon>
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
        description: "",
        ladderTitle: "",
        modelTitle: "",
        subtitle: "",
        unitIndex: 1,
        url: "",
      }
    },
    created(){
      this.modelTitle = this.modelTitle?this.modelTitle:""
    },
    methods: {
      addUnit(){this.unitIndex++},
      onSubTitle(subTitleEmit){this.subtitle = subTitleEmit},
      onUrl(urlEmit){this.url = urlEmit},
      onDescription(descriptionEmit){this.description = descriptionEmit},
      postLadder() {
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
        }).then((response)=>{
          console.log(response)
        }).catch((error)=>{
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

