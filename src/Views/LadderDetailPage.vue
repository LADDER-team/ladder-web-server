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
                <div @click="clickLadder" class="ladder-item">
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
            <div class="unit-item">
                <v-flex layout row class="unit-cover-info-wrap">
                    <v-avatar tile :size=40 class="unit-cover-avatar">
                        <img src="../assets/img/ladder_avatar.png" alt="avatar">
                    </v-avatar>
                    <div class="unit-cover-info">
                        <p class="unit-cover-info-name subheading">{{ladderCreator}}</p>
                        <p class="unit-cover-info-date body-1">
                            {{ladderUpdated.year}}-
                            {{ladderUpdated.month}}-
                            {{ladderUpdated.day}}に更新
                        </p>
                    </div>
                    <div class="unit-cover-btn-wrap">
                        <v-btn @click="clickLearnStart"
                               v-show="!learningStatus"
                               class="primary-btn">
                            このLadderで学習する
                        </v-btn>
                        <v-btn @click="clickLearnStart"
                               v-show="learningStatus"
                               class="learning-btn">
                            このLadderで学習中
                        </v-btn>
                        <v-btn @click="clickLearnStart"
                               v-show=""
                               class="learned-btn">
                            このLadderは学習済み
                        </v-btn>
                    </div>
                </v-flex>
                <h2 class="unit-title unit-cover-title display-1">{{ladderDetailList.title}}</h2>
                <div class="unit-description">
                    <p class="unit-description-text">{{ladderDetailList.ladder_description}}</p>
                </div>
            </div>
            <div v-for="(units, key) in unitList"
                 class="unit-item">
                <div class="unit-btn-wrap">
                    <v-btn @click="clickLearnEnd"
                           v-if="learningStatus&&learnedStatus(learningUnits, key)"
                           class="primary-btn unit-btn">
                        学習済みにする
                    </v-btn>
                    <v-btn @click="clickLearnEnd"
                           v-if="learningStatus&&!learnedStatus(learningUnits, key)"
                           class="learned-btn unit-btn">
                        学習済みです！
                    </v-btn>
                </div>
                <h2 class="unit-title display-1">{{ units.title }}</h2>
                <v-flex align-center justify-center
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
      learning: false,
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
      updateId: 0,
      easing: '',
      ladderCreator: '',
      ladderUpdated: {
        year: '',
        month: '',
        day: '',
      },
      url: 'https://blinky.nemui.org/shot/xlarge?',
      image: {
        src: 'https://s.wordpress.com/mshots/v1/',
        height: 1600,
        width: 1600,
        alt: '画像がないよ！'
      },
      ladderDetailList: [],
      unitList: [],
      nextLadderList: [],
      prevLadderList: [],
      learningList: [],
      learningStatusList: [],
      learningIndexes: []
    }),
    created() {
      this.ladderParam = this.$route.params.id
      this.learningIndexes = []
      this.createdLadderDetail()
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    // beforeUpdate() {
    //   if (this.offsetTop < 100 && this.prevLadderList.length !== 0) {
    //     this.prevLadder = true
    //   } else if (this.offsetTop > this.scrollWrapH - window.innerHeight * 0.9 - 200 && this.nextLadderList.length !== 0) {
    //     this.nextLadder = true
    //   } else {
    //     this.prevLadder = false
    //     this.nextLadder = false
    //   }
    //   if (this.ladderDetailList['recommended_prev_ladder']) {
    //     this.prevLadderId = this.ladderDetailList['recommended_prev_ladder'].id
    //     if (this.prevLadderList.length === 0) {
    //       this.getPrevLadder()
    //     }
    //   }
    //   if (this.ladderDetailList['recommended_next_ladder']) {
    //     this.nextLadderId = this.ladderDetailList['recommended_next_ladder'].id
    //     if (this.nextLadderList.length === 0) {
    //       this.getNextLadder()
    //     }
    //   }
    // },
    methods: {
      getPrevLadder() {
        axios({
          method: 'GET',
          url: 'http://127.0.0.1:8000/api/ladder/' + this.prevLadderId + '/'
        }).then((response) => {
          this.prevLadderList = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      getNextLadder() {
        axios({
          method: 'GET',
          url: 'http://127.0.0.1:8000/api/ladder/' + this.nextLadderId + '/'
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
        let index = this.findIndex(e, '.ladder-item')

        this.$nextTick(() => {
          this.scrollOffset = this.$el.getElementsByClassName('unit-item')[index].offsetTop - 100
          this.$vuetify.goTo('#scroll-wrap', this.options)
        })
      },
      findIndex(e, className, needParent) {
        let nodeList = document.querySelectorAll(className)
        let target = null;
        target = needParent ? e.target.parentNode : e.target
        return Array.prototype.indexOf.call(nodeList, target)
      },
      clickLearnStart() {
        if (!this.learningStatus || this.learningList === 0) {
          let list = this.unitList
          for (let index in list) {
            setTimeout(() => {
              this.postLearnInitialize(index)
            }, 50)
          }
        } else {
          alert('学習ファイトです！')
        }
      },
      postLearnInitialize(index) {
        let units = this.unitList
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/api/learningstatus/',
          headers: {
            "Accept": "application/json",
            "Authorization": "JWT " + this.token,
            "Content-type": "application/json"
          },
          data: {
            unit: units[index].id,
            status: false
          }
        }).then(() => {
          this.learning = true
        }).catch((error) => {
          console.log(error)
        })
      },
      putLearnActivate(id) {
        axios({
          method: 'PUT',
          url: 'http://127.0.0.1:8000/api/learningstatus/' + id + '/',
          headers: {
            "Accept": "application/json",
            "Authorization": "JWT " + this.token,
            "Content-type": "application/json"
          },
          data: {
            status: true
          },
        }).then(() => {
          this.updateId = id
        }).catch((error) => {
          console.log(error)
        })
      },
      findLearnActivateId(index) {
        let list = []
        let units = this.unitList
        let unitIndex = units[index].id

        this.learningStatusList.forEach((value) => {
          if (value.unit === unitIndex) {
            list.push(value)
          }
        })
        return list.length ? list[0].id : false
      },
      getLadderCreator() {
        let userId = this.ladderDetailList.user
        axios({
          method: 'GET',
          url: 'http://127.0.0.1:8000/api/users/' + userId + '/'
        }).then((response) => {
          this.ladderCreator = response.data.name
        }).catch((error) => {
          console.log(error)
        })
      },
      createdLadderDetail() {
        axios({
          method: 'GET',
          url: 'http://127.0.0.1:8000/api/ladder/' + this.ladderParam + '/'
        }).then((response) => {
          this.ladderDetailList = response.data
          this.unitList = response.data.units
        }).then(() => {
          this.unitList = _.indexBy(this.unitList, 'index')
        }).then(() => {
          this.createLadderDate(this.ladderDetailList.update_at)
        }).then(() => {
          this.getLadderCreator()
        }).then(() => {
          this.getLearningLadder()
        }).catch((error) => {
          console.log(error)
        })
      },
      createLadderDate(date) {
        date = date.toString()
        this.ladderUpdated.year = date.slice(0, 4)
        this.ladderUpdated.month = date.slice(5, 7)
        this.ladderUpdated.day = date.slice(8, 10)
      },
      getLearningLadder() {
        this.learningList = []
        let userId = this.userId
        axios({
          method: 'GET',
          url: 'http://127.0.0.1:8000/api/users/' + userId + '/learning-ladder/'
        }).then((response) => {
          this.learningList = response.data
        }).then(() => {
          if (!this.learningStatus) {
            this.doLearning()
          }
        }).then(() => {
          if (this.learningStatus) {
            this.getLearningStatus()
          }
        }).then(() => {
          if (this.learningStatus) {
            setTimeout(()=>{
              this.getLearningIndexes()
            }, 50)
          }
        }).catch((error) => {
          this.learning = false
          console.log(error)
        })
      },
      doLearning() {
        let learningList = this.learningList,
            ladderTitle = this.ladderDetailList.title
        learningList.map((value) => {
          if (value.title === ladderTitle) {
            this.learning = true
          }
        })
      },
      getLearningStatus() {
        let learningStatusList = []
        axios({
          method: 'GET',
          url: 'http://127.0.0.1:8000/api/learningstatus/'
        }).then((response) => {
          response.data.results.forEach((value) => {
            if (value.user === this.userId) {
              learningStatusList.push(value)
            }
          })
          this.learningStatusList = learningStatusList
        }).catch((error) => {
          console.log(error)
        })
      },
      clickLearnEnd(e) {
        let index = this.findIndex(e, '.unit-btn', true) + 1
        let activateId = this.findLearnActivateId(index)
        this.putLearnActivate(activateId)
      },
      getIsLearning(activateId) {
        let learningStatusList = this.learningStatusList
        let isLearned = false

        learningStatusList = _.sortBy(this.learningStatusList, (value) => {
          return value.unit
        })
        learningStatusList.forEach((value) => {
          if (value.id === activateId) {
            isLearned = value.status
          }
        })
        return isLearned
      },
      getLearningIndexes() {
        let title = this.ladderDetailList.title
        let learningList = [];
        this.learningList.forEach((value) => {
          if (title === value.title) {
            learningList = value.units
          }
        })
        learningList = _.sortBy(learningList, (value) => {
          return value.id
        })
        learningList.forEach((value, index) => {
          let activateId = this.findLearnActivateId(index + 1)
          let isLearned = this.getIsLearning(activateId)
          if (isLearned) {
            this.learningIndexes.push(value.index)
          }
        })
      },
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
            this.prevLadder = false
            this.nextLadder = false
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
      updateId: {
        handler() {
          this.getLearningLadder()
        }
      },
      learning: {
        handler() {
          this.getLearningStatus()
        }
      },
      learningStatusList: {
        handler(){
          console.log('update list')
          console.log(this.learningStatusList)
        }
      }
      // $route: {
      //   handler() {
      //     this.ladderDetailList = []
      //     this.nextLadderList = []
      //     this.prevLadderList = []
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
      learningStatus() {
        return this.learning
      },
      learnedStatus() {
        return (array, key) => {
          return array.indexOf(parseInt(key)) === -1
        }
      },
      learningUnits() {
        return this.learningIndexes
      },
      ...mapGetters({
        name: 'nameGetter',
        token: 'tokenGetter',
        userId: 'userIdGetter'
      }),
    }
  }
</script>
<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/ladderDetail"
</style>
