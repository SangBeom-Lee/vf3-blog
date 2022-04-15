<script setup lang="ts">
import PostListItem from 'src/components/PostListItem.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { QueryDocumentSnapshot } from '@google-cloud/firestore'
import { Post, getPosts } from 'src/models/Post'

const items = ref < QueryDocumentSnapshot<Post>[]>([])
const getData = async () => {
  const querySnapshot = await getPosts()
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
