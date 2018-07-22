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
    name: "ChartTabComponent",
    data() {
      return {
        chartDialog: false,
        active: 0,
        slide: 0,
        chartSlide: 4,
        charts: {
          0: "ラダーの使い方1",
          1: "ラダーの使い方2",
          2: "ラダーの使い方3",
          3: "ラダーの使い方4",
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
        this.active = (active < 3 ? active + 1 : 0);
        setTimeout(() => {
          this.slide = (slide < 3 ? slide + 1 : 0);
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