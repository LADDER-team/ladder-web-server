<template>
    <v-dialog
            v-model="chartDialog"
            width="500">
        <div class="chart-dialog-inner">
            <v-tabs v-model="active"
                    color="cyan" dark
                    slider-color="yellow">
                <v-tab v-for="n in 4" :key="n" ripple>
                    {{ n }}
                </v-tab>
                <v-tab-item v-for="n in 4" :key="n">
                    <v-card>
                        <v-card-text>ラダーの使い方</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
            <v-flex class="text-xs-right mt-3">
                <v-btn @click="next">次へ</v-btn>
            </v-flex>
        </div>
    </v-dialog>
</template>
<script>
  export default {
    name: "ChartTabComponent",
    data(){
      return{
        chartDialog: false,
        active: null
      }
    },
    mounted(){
      this.chartDialog = true;
    },
    methods: {
      next () {
        const active = parseInt(this.active)
        this.active = (active < 3 ? active + 1 : 0)
      }
    },
  }
</script>
<style scope lang="sass">
    @import "../styles/base"
    .chart-dialog-inner
        background-color: #fff
</style>