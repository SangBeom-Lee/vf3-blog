<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        text: {{ addedText }}
      </q-card-section>
      <q-card-section />
      <q-card-actions>
        <q-btn
          flat
          label="add"
          @click="add"
        />
      </q-card-actions>
      <q-card-section>
        compo....
        <TestComponent :text="text" />
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import TestComponent from 'src/components/TestComponent.vue'

export default defineComponent({
  name: 'TestVue',
  components: { TestComponent },
  setup () {
    const text = ref('abc')
    const addedText = computed(() => text.value + ' added')
    const add = () => {
      text.value += 'add'
    }
    return {
      text,
      addedText,
      add
    }
  }
})
</script>
