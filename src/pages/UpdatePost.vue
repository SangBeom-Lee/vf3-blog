<script setup lang="ts">
import { computed } from 'vue'
import PostEditItem from 'src/components/PostEditItem.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = computed(() => route.params.id)

</script>
<template>
  <q-page padding>
    <PostEditItem :id="id" />
  </q-page>
</template>
