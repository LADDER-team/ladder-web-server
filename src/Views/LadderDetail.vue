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
                <div v-for="unit in ladderDetailList.unit"
                     @click="ladderClicked"
                     class="ladder-item">
                    <p>unit:{{ unit.index }}</p>
                    <p>{{ unit.title }}</p>
                </div>
            </div>
        </v-flex>
        <v-flex md7 lg7
                justify-center
                align-start
                id="unit-items"
                class="unit-wrap">
            <div v-for="unit in ladderDetailList.unit"
                 class="unit-item">
                <p class="unit-head">unit:{{ unit.index }}</p>
                <h2 class="unit-title">{{ unit.title }}</h2>
                <v-flex
                        justify-center
                        align-center
                        class="unit-image-wrap">
                    <img src="../assets/img/book1.jpg"
                         :alt="defaultImage.alt"
                         class="unit-image">
                </v-flex>
                <div class="unit-description">
                    {{ unit.description }}
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'Ladder',
    data: () => ({
      ladderActive: false,
      ladderToUnit: false,
      offsetTop: 0,
      scrollWrapH: 0,
      unitH: 0,
      unitPosition: 0,
      unitScroll: 0,
      unitActivate: 0,
      selectedLadder: 0,
      duration: 300,
      scrollOffset: 0,
      easing: '',
      defaultImage: {
        src: "http://via.placeholder.com/350x150",
        src1: "../assets/img/book1.jpg",
        alt: "placeholder-image"
      },
      ladderDetailList: []
    }),
    created() {},
    mounted() {
      const param = this.$route.params.id
      axios.get('/api/ladder/'+param, {
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
      window.addEventListener('scroll', this.handleScroll)
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
      }
    },
    watch: {
      offsetTop: {
        handler(){
          this.unitScroll = this.unitScrolled
          this.unitActivate = this.unitActivated
          for (let i=0; i<this.unitActivate; i++){
            document.getElementsByClassName('ladder-item')[i].classList.add('ladder-item-active')
          }
        }
      },
      ladderDetailList: {
        handler() {
          this.$nextTick(() => {
            this.scrollWrapH = this.$refs.scrolledWrapRef.getBoundingClientRect().height
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
