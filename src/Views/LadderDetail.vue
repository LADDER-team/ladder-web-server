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
                <div v-for="units in ladderDetailList.units"
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
            <div v-for="units in ladderDetailList.units"
                 class="unit-item">
                <p class="unit-head">unit:{{ units.index }}</p>
                <h2 class="unit-title">{{ units.title }}</h2>
                <v-flex align-center　justify-center
                        class="unit-image-wrap">
                    <a :href="units.url" target="_blank">
                        <img :src="image.src?image.src+units.url+'?w='+image.width+'&h='+image.height+'?':image.defaultSrc"
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

  export default {
    name: 'Ladder',
    data: () => ({
      ladderActive: false,
      ladderToUnit: false,
      nextLadder: false,
      prevLadder: false,
      nextLadderId: null,
      getLadderParam: null,
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
      url: 'https://blinky.nemui.org/shot/xlarge?',
      image: {
        src: 'https://s.wordpress.com/mshots/v1/',
        defaultSrc: 'http://via.placeholder.com/350x150',
        height: 1000,
        width: 1000,
        alt: '画像がないよ！'
      },
      ladderDetailList: [],
      nextLadderList: [],
      prevLadderList: []
    }),
    mounted() {
      this.getLadderParam = this.$route.params.id
      axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/ladder/' + this.getLadderParam + '/'
      }).then((response) => {
        this.ladderDetailList = response.data
      }).catch((error) => {
        console.log(error)
      })
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeUpdate() {
      if (this.ladderDetailList['recommended_prev_ladder']) {
        this.prevLadderId = this.ladderDetailList['recommended_prev_ladder'].id

        if (this.prevLadderList.length === 0) {
          axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/ladder/' + this.prevLadderId + '/'
          }).then((response) => {
            this.prevLadderList = response.data
          }).catch((error) => {
            console.log(error)
          })
        }
      }
      if (this.ladderDetailList['recommended_next_ladder']) {
        this.nextLadderId = this.ladderDetailList['recommended_next_ladder'].id
        if (this.nextLadderList.length === 0) {
          axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/ladder/' + this.nextLadderId + '/'
          }).then((response) => {
            this.nextLadderList = response.data
          }).catch((error) => {
            console.log(error)
          })
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
    },
    watch: {
      offsetTop: {
        handler() {
          //ladder activate
          this.unitScroll = this.unitScrolled
          this.unitActivate = this.unitActivated
          for (let i = 0; i < this.unitActivate; i++) {
            document.getElementsByClassName('ladder-item')[i].classList.add('ladder-item-active')
          }

          //peg activate
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
      $route: {
        handler() {
          this.ladderDetailList = [];
          this.nextLadderList = [];
          this.prevLadderList = [];
          this.getLadderParam = this.$route.params.id
          axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/ladder/' + this.getLadderParam + '/'
          }).then((response) => {
            this.ladderDetailList = response.data
          }).catch((error) => {
            console.log(error)
          })
        }
      }
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
    }
  }
</script>
<style scoped lang="sass">
    @import "../styles/colors"
    @import "../styles/layout"
    @import "../styles/base"
    @import "../styles/ladderDetail"
</style>
