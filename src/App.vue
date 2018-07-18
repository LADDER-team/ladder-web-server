<template>
    <v-app id="inspire" indig>
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
  import ToolBar from './components/ToolBarComponent'
  import Footer from './components/FooterComponent'
  import LadderList from './Views/LadderList'

  export default {
    name: 'Ladder',
    data: () => ({
      drawer: true,
      right: true,
      clipped: false,
      fixed: false,
      miniVariant: false,
      rightDrawer: false
    }),
    components: {
      ToolBar,
      LadderList,
      Footer
    }
  }
</script>
<style scoped lang="sass">
    @import "./styles/base"
</style>
