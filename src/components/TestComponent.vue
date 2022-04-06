<template>
  <div>
    text : {{ text }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TestComponent',
  props: {
    text: {
      type: String,
      default: () => 'abcd'
    }
  },
  data () {
    return {
      counter: 5
    }
  }
})
</script>
