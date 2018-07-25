<template>
    <v-layout justify-center
              ref="scrollWrapRef"
              id="scroll-wrap"
              class="layout-ladder-post">
        <v-flex justify-center
                align-start
                class="ladder-posts-wrap">
            <v-form ref="form" v-model="valid"
                    lazy-validation
                    class="ladder-post-form">
                <v-text-field
                        v-model="modelTitle"
                        outline
                        :rules="titleRule"
                        class="post-text-field post-title"
                        label="Ladderタイトル"
                        placeholder="初心者がDjangoアプリケーションを作るまで！"/>
                <v-flex v-for="index in unitIndex" :key="index">
                    <LadderPostItem :index="index"
                                    @sub-title-emit="onSubTitle"
                                    @url-emit="onUrl"
                                    @description-emit="onDescription"
                                    class="ladder-post-item"/>
                </v-flex>
                <v-layout flex row justify-center
                          class="ladder-post-icons">
                    <v-icon size="40" @click="clickUnitAdd"
                            class="ladder-post-add">add_circle_outline
                    </v-icon>
                    <v-icon size="40" @click="clickUnitRemove"
                            class="ladder-post-remove">remove_circle
                    </v-icon>
                </v-layout>
                <v-flex class="ladder-post-btn">
                    <v-btn @click="clickLadderPost"
                           dark fab large
                           class="contribution-floating-btn ladder-post-submit">
                        <v-icon dark>done</v-icon>
                    </v-btn>
                </v-flex>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
  import LadderPostItem from "../components/LadderPostItemComponent"
  import axios from "axios"

  export default {
    name: "LadderPost",
    data() {
      return {
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
        },
        //validation
        valid: true,
        titleRule: [v => !!v || 'タイトルを入力してください'],
      }
    },
    created() {
      this.modelTitle = this.modelTitle ? this.modelTitle : ""
    },
    methods: {
      clickUnitAdd() {
        if (this.unitIndex < 8) {
          this.unitIndex++;
        } else {
          alert('これ以上ユニットは増やせません！')
        }
      },
      clickUnitRemove() {
        if (this.unitIndex === 1) {
          alert('これ以上ユニットは削除できません！')
        } else {
          this.unitIndex--;
        }
      },
      onDescription(descriptionEmit, index) {
        this.$set(this.descriptionList, index, descriptionEmit);
      },
      onSubTitle(subTitleEmit, index) {
        this.$set(this.subtitleList, index, subTitleEmit);
      },
      onUrl(urlEmit, index) {
        this.$set(this.urlList, index, urlEmit);
      },
      clickLadderPost() {
        for (let i = 1; i <= this.unitIndex; i++) {
          this.unit[i - 1] =
              {
                title: this.subtitleList[i],
                url: this.urlList[i],
                description: this.descriptionList[i],
                index: i
              }
        }
        let unit = JSON.stringify(this.unit)
        unit = JSON.parse(unit)

        if (this.$refs.form.validate()) {
          axios({
            method: 'POST',
            url: 'https://api.ladder.noframeschools.com/api/ladder/',
            headers: {
              "Accept": "application/json",
              "Authorization": "JWT " + this.$store.state.token,
              "Content-type": "application/json"
            },
            data: {
              title: this.modelTitle,
              units: unit
            }
          }).then(() => {
            alert('ラダーを投稿しました！トップページへ遷移します！')
            this.$router.push('/')
          }).catch((error) => {
            if (!this.$store.state.isLogin) {
              alert('ログインしてください！')
            } else {
              alert('投稿に不備があります！！')
            }
            console.log(error)
          })
        }
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

