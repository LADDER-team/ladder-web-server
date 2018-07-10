<template>
    <v-layout justify-center class="layout-ladder-post">
        <v-flex justify-center
                align-start
                class="ladder-posts-wrap">
            <LadderPostItem/>
            <div class="ladder-post-icon">
                <v-icon size="40">control_point</v-icon>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
  import LadderPostItem from '../components/LadderPostItemComponent'
  export default {
    name: "LadderPost",
    components: {
      LadderPostItem
    }
  }
</script>

<style scoped lang="sass">
    @import "../styles/base"
    @import "../styles/ladderPost"
</style>