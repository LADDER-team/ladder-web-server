<template>
    <v-layout
            justify-center
            align-start
            wrap
            ref="scrolledWrapRef"
            id="scrolled-wrap"
            class="layout-ladder-detail">
        <v-flex md2 lg2
                justify-center
                align-cener
                class="ladder-wrap">
            <div id="ladder-action-wrap" class="ladder-inner">
                <div v-for="units in ladderDetailList.units"
                     @click="ladderClicked"
                     class="ladder-item">
                    <p>unit:{{ units.index }}</p>
                    <p>{{ units.title }}</p>
                </div>
            </div>
        </v-flex>
        <v-flex md7 lg7
                justify-center
                align-start
                id="unit-items"
                class="unit-wrap">
            <div v-for="units in ladderDetailList.units"
                 class="unit-item">
                <p class="unit-head">unit:{{ units.index }}</p>
                <h2 class="unit-title">{{ units.title }}</h2>
                <v-flex justify-center
                        align-center
                        class="unit-image-wrap">
                    <a :href="units.url" target="_blank">
                        <img :src="url+units.url"
                         :alt="defaultImage.alt"
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
                    <v-icon size="60" light class="peg-link-icon">person</v-icon>
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
                    <v-icon size="60" light class="peg-link-icon">person</v-icon>
                    <span>{{ nextLadderList.title}}</span>
                </p>
            </router-link>
        </transition>
    </v-layout>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'Ladder',
    data: () => ({
      ladderActive: false,
      ladderToUnit: false,
      prevLadder: false,
      nextLadder: false,
      prevLadderId: null,
      nextLadderId: null,
      offsetTop: 0,
      scrollWrapH: 0,
      unitH: 0,
      unitPosition: 0,
      unitScroll: 0,
      unitActivate: 0,
      selectedLadder: 0,
      duration: 300,
      scrollOffset: 0,
      getLadderParam: null,
      easing: '',
      url: 'https://blinky.nemui.org/shot/xlarge?',
      defaultImage: {
        src: "http://via.placeholder.com/350x150",
        src1: "../assets/img/book1.jpg",
        alt: "placeholder-image"
      },
      ladderDetailList: [],
      prevLadderList: [],
      nextLadderList: []
    }),
    mounted() {
      this.getLadderParam = this.$route.params.id
      axios.get('/api/ladder/'+this.getLadderParam+'/', {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8000',
          'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS',
          'Access-Control-Max-Age': '1728000',
        }
      })
          .then((response) => {
            this.ladderDetailList = response.data
            console.log(this.ladderDetailList)
          })
          .catch((error) => {
            console.log(error)
          })
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeUpdate() {
      if (this.ladderDetailList['recommended_prev_ladder']) {
        let prevId = this.ladderDetailList['recommended_prev_ladder'].id
        this.prevLadderId = prevId

        if (this.prevLadderList.length === 0) {
          axios.get('/api/ladder/' + prevId, {
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:8000',
              'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
              'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS',
              'Access-Control-Max-Age': '1728000',
            }
          })
              .then((response) => {
                this.prevLadderList = JSON.stringify(response.data)
              })
              .catch((error) => {
                console.log(error)
              })
        }
      }
      if (this.ladderDetailList['recommended_next_ladder']) {
        let nextId = this.ladderDetailList['recommended_next_ladder'].id
        this.nextLadderId = nextId
        if (this.nextLadderList.length === 0) {
          axios.get('/api/ladder/' + nextId, {
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:8000',
              'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
              'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS',
              'Access-Control-Max-Age': '1728000',
            }
          })
              .then((response) => {
                this.nextLadderList = response.data
              })
              .catch((error) => {
                console.log(error)
              })
        }
      }
      // when loaded page, true into pegLadder
      if (this.offsetTop<100 && this.prevLadderList.length !== 0){
        this.prevLadder = true
      } else if(this.offsetTop>this.scrollWrapH-window.innerHeight*0.9-200 && this.nextLadderList.length !== 0){
        this.nextLadder = true
      } else {
        this.prevLadder = false
        this.nextLadder = false
      }
    },
    methods: {
      handleScroll() {
        this.offsetTop = window.pageYOffset
      },
      ladderClicked(e) {
        this.duration = 600
        this.easing = 'easeInOutCubic'
        let index = this.foundIndex(e)

        this.$nextTick(() => {
          this.scrollOffset = this.$el.getElementsByClassName('unit-item')[index].offsetTop - 100
          this.$vuetify.goTo('#scrolled-wrap', this.options)
        })
      },
      foundIndex(e){
        let nodeList = document.querySelectorAll('.ladder-item'),
            target = e.target
        return Array.prototype.indexOf.call(nodeList, target)
      },
    },
    watch: {
      offsetTop: {
        handler(){
          //ladder activate
          this.unitScroll = this.unitScrolled
          this.unitActivate = this.unitActivated
          for (let i=0; i<this.unitActivate; i++){
            document.getElementsByClassName('ladder-item')[i].classList.add('ladder-item-active')
          }

          //peg activate
          if (this.offsetTop<100 && this.prevLadderList.length !== 0){
            this.prevLadder = true
          }
          else if(this.offsetTop>this.scrollWrapH-window.innerHeight*0.9-200 && this.nextLadderList.length !== 0){
            this.nextLadder = true
          }
          else{
            this.prevLadder = false;
            this.nextLadder = false;
          }
        }
      },
      ladderDetailList: {
        handler() {
          this.$nextTick(() => {
            this.scrollWrapH = this.$refs.scrolledWrapRef.getBoundingClientRect().height
          })
        }
      },
      $route:{
        handler(){
          this.ladderDetailList = [];
          this.nextLadderList = [];
          this.prevLadderList = [];
          this.getLadderParam = this.$route.params.id
          axios.get('/api/ladder/'+this.getLadderParam, {
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:8000',
              'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
              'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS',
              'Access-Control-Max-Age': '1728000',
            }
          })
              .then((response) => {
                this.ladderDetailList = response.data
              })
              .catch((error) => {
                console.log(error)
              })
        }
      }
    },
    computed: {
      unitScrolled(){return (this.offsetTop - 340) / (window.innerHeight * 0.9)},
      unitActivated(){return Math.round(this.unitScroll)},
      options () {
        return {
          duration: this.duration,
          offset: this.scrollOffset,
          easing: this.easing
        }
      }
    }
  }
</script>
<style scoped lang="sass">
    @import "../styles/colors"
    @import "../styles/layout"
    @import "../styles/base"
    @import "../styles/ladderDetail"
</style>
