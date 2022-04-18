<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { User } from 'src/models/User'
import { QueryDocumentSnapshot } from 'firebase/firestore'

const props = defineProps<{
  item: QueryDocumentSnapshot < User >
}>()
const user = computed(() => props.item.data())

</script>
<template>
  <q-item>
    <q-item-section avatar>
      <q-img :src="user.photoURL" />
    </q-item-section>
    <q-item-section>
      <q-item-label caption>
        {{ user.email }}
      </q-item-label>
      <q-item-label caption>
        {{ user.displayName }}
      </q-item-label>
      <q-item-label>{{ user.createdAt }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
