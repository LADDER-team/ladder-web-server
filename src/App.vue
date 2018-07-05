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
                <router-link to="/">TOP</router-link>
                <router-link to="/detail">Detail</router-link>
                <router-view />
            </v-container>
        </v-content>
        <Footer/>
    </v-app>
</template>
<script>
  import ToolBar from './components/ToolBarComponent'
  import Footer from './components/FooterComponent'

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
      Footer
    }
  }
</script>
<style scoped lang="sass">
    @import "./styles/layout"
</style>
