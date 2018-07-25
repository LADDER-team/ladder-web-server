<template>
    <v-dialog
            v-model="chartDialog"
            width="500">
        <div class="chart-dialog-inner">
            <v-tabs v-model="active"
                    color="cyan" dark
                    slider-color="yellow">
                <v-tab v-for="n in chartSlide" :key="n" ripple>
                    {{ n }}
                </v-tab>
                <v-tab-item v-for="n in chartSlide" :key="n">
                    <v-card>
                        <v-card-text>{{ charts[slide] }}</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
            <v-flex class="text-xs-right mt-3">
                <v-btn @click="next">
                    {{this.slide===this.chartSlide-1?"戻る":"次へ"}}
                </v-btn>
                <v-btn v-if="this.slide===this.chartSlide-1"
                       @click="close">
                    閉じる
                </v-btn>
            </v-flex>
        </div>
    </v-dialog>
</template>
<script>
  export default {
    name: "FirstChartComponent",
    data() {
      return {
        chartDialog: false,
        active: 0,
        slide: 0,
        chartSlide: 3,
        charts: {
          0: "LADDERへようこそ！まずは投稿されているladderを見学してみよう！",
          1: "TOPページの一覧から、目に留まったladderを選んでね！",
          2: "後ろにladderの一覧が並んでいなければ、左上のロゴからTOPへ！"
        }
      }
    },
    mounted(){
      console.log(this.$store)
      if (!this.$store.state.isSign&&!localStorage.getItem("token")) {
        this.chartDialog = true
      }
    },
    methods: {
      next() {
        const active = parseInt(this.active);
        const slide = parseInt(this.slide);
        this.active = (active < 2 ? active + 1 : 0);
        setTimeout(() => {
          this.slide = (slide < 2 ? slide + 1 : 0);
        }, 300)
      },
      close() {
        this.chartDialog = false
      }
    },
  }
</script>
<style scope lang="sass">
    @import "../styles/base"
    @import "../styles/chartTab"
</style>