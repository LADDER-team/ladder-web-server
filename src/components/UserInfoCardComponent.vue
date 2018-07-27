<template>
    <v-card>
        <v-card-title>
            <span class="headline">{{name}}</span>
        </v-card-title>
        <v-card-text>
        </v-card-text>
    </v-card>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "UserInfoCardComponent",
    data(){
      return{
        name: this.$store.state.name,
      }
    },
    created(){
      axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/users/'

      })
    }
  }
</script>

<style scoped>

</style>