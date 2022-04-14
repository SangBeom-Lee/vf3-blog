<script setup lang="ts">
import PostListItem from 'src/components/PostListItem.vue'
import { db } from 'boot/firebase'
import { collection, query, getDocs } from 'firebase/firestore'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { DocumentData, QueryDocumentSnapshot } from '@google-cloud/firestore'

const items = ref < QueryDocumentSnapshot<DocumentData>[]>([])
const getData = async () => {
  const q = query(collection(db, 'posts'))
  const querySnapshot = await getDocs(q)
  items.value = querySnapshot.docs
}

const router = useRouter()
const route = useRoute()
const loadWritePage = () => {
  const writePath = '/' + route.params.menu + '/write'
  router.push(writePath)
}

onMounted(() => getData())
</script>
<template>
  <q-list>
    <PostListItem
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </q-list>

  <q-page-sticky
    position="bottom-right"
    :offset="[18, 18]"
  >
    <q-btn
      round
      color="pink"
      icon="mdi-pencil"
      @click="loadWritePage"
    />
  </q-page-sticky>
</template>
