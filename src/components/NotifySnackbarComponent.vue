<template>
    <v-snackbar
            v-model="snackbar"
            :bottom="y === 'bottom'"
            :left="x === 'left'"
            :multi-line="mode === 'multi-line'"
            :right="x === 'right'"
            :timeout="timeout"
            :top="y === 'top'"
            :vertical="mode === 'vertical'">
        {{ notifyText }}
        <v-btn color="pink"
               flat
               @click="snackbar = false">
            {{notifyButton}}
        </v-btn>
    </v-snackbar>
</template>

<script>
  export default {
    name: "NotifySnackbarComponent",
    data() {
      return {
        snackbar: this.$props.opened,
        y: 'top',
        x: null,
        notifyButton: this.$props.button,
        mode: '',
        notifyText: this.$props.text,
        timeout: 6000
      }
    },
    props: {
      opened: Boolean,
      button: "",
      text: ""
    },
    watch:{
      snackbar:{
        handler(){
          console.log(this.snackbar)
        }
      }
    }
  }
</script>

<style scoped>

</style>