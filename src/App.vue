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
                <router-view />
            </v-container>
        </v-content>
        <Footer/>
    </v-app>
</template>
<script>
  import ToolBar from './components/ToolBarComponent'
  import Footer from './components/FooterComponent'
  import LadderList from './Views/LadderList'
  import store from "./store";

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
    mounted(){
      console.log(store.state.test)
    },
    components: {
      ToolBar,
      LadderList,
      Footer
    }
  }
</script>
<style scoped lang="sass">
    @import "./styles/colors"
    @import "./styles/layout"
</style>
