<template>
    <v-app id="inspire" indig>
        <ChartTab/>
        <ToolBar/>
        <v-content id="window">
            <v-container
                    fluid
                    fill-height
                    justify-center
                    align-start
                    class="g-container">
                <transition name="root">
                    <router-view />
                </transition>
            </v-container>
        </v-content>
        <Footer/>
    </v-app>
</template>
<script>
  import ChartTab from './components/ChartTabComponent'
  import Footer from './components/FooterComponent'
  import LadderList from './Views/LadderList'
  import ToolBar from './components/ToolBarComponent'

  export default {
    name: 'Ladder',
    data: () => ({
      drawer: true,
      right: true,
      clipped: false,
      fixed: false,
      miniVariant: false,
      rightDrawer: false,
      text: "ラダーの使い方！"
    }),
    components: {
      ChartTab,
      Footer,
      LadderList,
      ToolBar
    }
  }
</script>
<style scoped lang="sass">
    @import "./styles/base"
</style>
