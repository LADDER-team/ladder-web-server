<template>
    <v-layout align-start justify-center wrap
              ref="scrollWrapRef"
              id="scroll-wrap"
              class="layout-ladder-detail">
        <v-flex md2 lg2
                align-cener
                justify-center
                class="ladder-wrap">
            <div id="ladder-action-wrap" class="ladder-inner">
                <div @click="clickLadder" class="ladder-item" >
                    <p>{{ladderDetailList.title}}</p>
                </div>
                <div v-for="units in unitList"
                     @click="clickLadder"
                     class="ladder-item">
                    <p>unit:{{ units.index }}</p>
                    <p>{{ units.title }}</p>
                </div>
            </div>
        </v-flex>
        <v-flex md7 lg7
                align-start justify-center
                id="unit-items"
                class="unit-wrap">
            <div class="unit-item unit-cover">
                <v-flex layout row class="unit-cover-info-wrap">
                    <v-avatar tile :size=40 class="unit-cover-avatar">
                        <img src="../assets/img/ladder_avatar.png" alt="avatar">
                    </v-avatar>
                    <div class="unit-cover-info">
                        <p class="unit-cover-info-name subheading">{{ladderCreator}}</p>
                        <p class="unit-cover-info-date body-1">2018年1月1日に更新</p>
                    </div>
                    <div class="unit-cover-btn-wrap">
                        <v-btn @click="clickLearnStart" class="primary-btn">このLadderで学習する</v-btn>
                    </div>
                </v-flex>
                <h2 class="unit-title unit-cover-title display-1">{{ladderDetailList.title}}</h2>
                <div class="unit-description">
                    Ladderの説明文が入ります
                </div>
            </div>
            <div v-for="units in unitList"
                 class="unit-item">
                <h2 class="unit-title display-1">{{ units.title }}</h2>
                <v-flex align-center　justify-center
                        class="unit-image-wrap">
                    <a :href="units.url" target="_blank">
                        <img :src="image.src+units.url+'?w='+image.width+'&h='+image.height+'?'"
                             :alt="image.alt"
                             class="unit-image">
                    </a>
                </v-flex>
                <div class="unit-description">
                    {{ units.description }}
                </div>
            </div>
        </v-flex>
        <transition name="peg-ladder">
            <router-link :to="`/detail/${ prevLadderId }`"
                         v-show="prevLadder"
                         class="prev-ladder peg-link">
                <h3 class="peg-link-catch">このLADDERの前に最もペグされたLADDER</h3>
                <p class="peg-link-title">
                    <v-icon size="60" light
                            class="peg-link-icon">person
                    </v-icon>
                    <span>{{ prevLadderList.title}}</span>
                </p>
            </router-link>
        </transition>
        <transition name="peg-ladder">
            <router-link :to="`/detail/${ nextLadderId }`"
                         v-show="nextLadder"
                         class="next-ladder peg-link">
                <h3 class="peg-link-catch">このLADDERの後に最もペグされたLADDER</h3>
                <p class="peg-link-title">
                    <v-icon size="60" light
                            class="peg-link-icon">person
                    </v-icon>
                    <span>{{ nextLadderList.title}}</span>
                </p>
            </router-link>
        </transition>
    </v-layout>
</template>
<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import _ from 'underscore'

  export default {
    name: 'LadderDetailPage',
    data: () => ({
      ladderActive: false,
      ladderToUnit: false,
      nextLadder: false,
      prevLadder: false,
      nextLadderId: null,
      ladderParam: null,
      prevLadderId: null,
      duration: 300,
      offsetTop: 0,
      scrollWrapH: 0,
      selectedLadder: 0,
      scrollOffset: 0,
      unitH: 0,
      unitPosition: 0,
      unitScroll: 0,
      unitActivate: 0,
      easing: '',
      ladderCreator: '',
      url: 'https://blinky.nemui.org/shot/xlarge?',
      image: {
        src: 'https://s.wordpress.com/mshots/v1/',
        height: 1000,
        width: 1000,
        alt: '画像がないよ！'
      },
      ladderDetailList: [],
      unitList: [],
      nextLadderList: [],
      prevLadderList: []
    }),
    mounted() {
      this.ladderParam = this.$route.params.id;
      this.mountedLadderDetail()
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUpdate() {
      if (this.ladderDetailList['recommended_prev_ladder']) {
        this.prevLadderId = this.ladderDetailList['recommended_prev_ladder'].id
        if (this.prevLadderList.length === 0) {
          this.getPrevLadder()
        }
      }
      if (this.ladderDetailList['recommended_next_ladder']) {
        this.nextLadderId = this.ladderDetailList['recommended_next_ladder'].id
        if (this.nextLadderList.length === 0) {
          this.getNextLadder()
        }
      }
      if (this.offsetTop < 100 && this.prevLadderList.length !== 0) {
        this.prevLadder = true
      } else if (this.offsetTop > this.scrollWrapH - window.innerHeight * 0.9 - 200 && this.nextLadderList.length !== 0) {
        this.nextLadder = true
      } else {
        this.prevLadder = false
        this.nextLadder = false
      }
    },
    methods: {
      getPrevLadder(){
        axios({
          method: 'GET',
          url: 'https://api.ladder.noframeschools.com/api/ladder/' + this.prevLadderId + '/'
        }).then((response) => {
          this.prevLadderList = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      getNextLadder(){
        axios({
          method: 'GET',
          url: 'https://api.ladder.noframeschools.com/api/ladder/' + this.nextLadderId + '/'
        }).then((response) => {
          this.nextLadderList = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      handleScroll() {
        this.offsetTop = window.pageYOffset
      },
      clickLadder(e) {
        this.duration = 600
        this.easing = 'easeInOutCubic'
        let index = this.foundIndex(e)

        this.$nextTick(() => {
          this.scrollOffset = this.$el.getElementsByClassName('unit-item')[index].offsetTop - 100
          this.$vuetify.goTo('#scroll-wrap', this.options)
        })
      },
      foundIndex(e) {
        let nodeList = document.querySelectorAll('.ladder-item'),
            target = e.target
        return Array.prototype.indexOf.call(nodeList, target)
      },
      clickLearnStart(){
        alert("機能搭載まであと少し！お待ちください！")
      },
      getLadderCreater(){
        let userId = this.ladderDetailList.user
        console.log(this.ladderDetailList)
        axios({
          method: 'GET',
          url: 'https://api.ladder.noframeschools.com/api/users/' + userId + '/'
        }).then((response) => {
          this.ladderCreator = response.data.name
        }).catch((error) => {
          console.log(error)
        })
      },
      mountedLadderDetail(){
        axios({
          method: 'GET',
          url: 'https://api.ladder.noframeschools.com/api/ladder/' + this.ladderParam + '/'
        }).then((response) => {
          this.ladderDetailList = response.data
          this.unitList = response.data.units
        }).then(()=>{
          this.unitList = _.indexBy(this.unitList, 'index')
        }).then(()=>{
          this.getLadderCreater();
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    watch: {
      offsetTop: {
        handler() {
          if (this.offsetTop < 100 && this.prevLadderList.length !== 0) {
            this.prevLadder = true
          }
          else if (this.offsetTop > this.scrollWrapH - window.innerHeight * 0.9 - 200 && this.nextLadderList.length !== 0) {
            this.nextLadder = true
          }
          else {
            this.prevLadder = false;
            this.nextLadder = false;
          }
        }
      },
      ladderDetailList: {
        handler() {
          this.$nextTick(() => {
            this.scrollWrapH = this.$refs.scrollWrapRef.getBoundingClientRect().height
          })
        }
      },
      // $route: {
      //   handler() {
      //     this.ladderDetailList = [];
      //     this.nextLadderList = [];
      //     this.prevLadderList = [];
      //     this.ladderParam = this.$route.params.id
      //     this.getLadder()
      //   }
      // }
    },
    computed: {
      unitScrolled() {
        return (this.offsetTop - 340) / (window.innerHeight * 0.9)
      },
      unitActivated() {
        return Math.round(this.unitScroll) + 1
      },
      options() {
        return {
          duration: this.duration,
          offset: this.scrollOffset,
          easing: this.easing
        }
      },
      ...mapGetters({
        name: 'nameGetter',
        token: 'tokenGetter'
      }),
    }
  }
</script>
<style scoped lang="sass">
    @import "../styles/colors"
    @import "../styles/layout"
    @import "../styles/base"
    @import "../styles/ladderDetail"
</style>
