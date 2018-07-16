<template>
    <v-layout justify-center class="layout-ladder-post">
        <v-flex justify-center
                align-start
                class="ladder-posts-wrap">
            <v-flex v-for="n in unit" :key="n">
                <LadderPostItem :title="n"/>
            </v-flex>
            <div class="ladder-post-icon" @click="addUnit" >
                <v-icon size="40">control_point</v-icon>
            </div>
        </v-flex>
        <v-flex class="ladder-post-btn">
            <v-btn @click="postLadder"
                   class="contribution-floating-btn"
                   dark
                   fab>
                <v-icon dark >done</v-icon>
            </v-btn>
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
        ladderTitle: null,
        unitTitle: null,
        description: null,
        url: null,
        index: null,
        unit: 1,
      }
    },
    methods: {
      addUnit(){this.unit++},
      onTitle(value){console.log(value)},
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
            title: "LADDER TITLE",
            units: [
              {
                title: "LADDER SUB TITLE",
                description: "LADDER DESCRIPTION",
                url: "https://www.google.com/",
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

