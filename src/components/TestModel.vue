<script setup lang="ts">
import {
  ref,
  defineProps,
  defineEmits
} from 'vue'

const props = defineProps<{ modelvalue: string }>()
const emits = defineEmits<{(e: 'update:text', value: string): void}>()
const changeText = ref(props.modelvalue)

function change () {
  emits('update:text', changeText.value)
}

</script>

<template>
  <q-card>
    <q-card-section>
      <textarea v-model="changeText" />
    </q-card-section>
    <q-card-actions>
      <q-btn
        label="change"
        @click="change"
      />
    </q-card-actions>
  </q-card>
</template>
