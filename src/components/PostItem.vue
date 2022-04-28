<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { getPost, Post } from 'src/models/Post'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps<{
  id: string
}>()

const post = ref<Post | null>()

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit
  ],
  editable: false
})

onMounted(() => {
  return getPost(props.id)
    .then(data => {
      post.value = data
      editor.value.commands.setContent(data.content || '')
    })
})

</script>
<template>
  <q-card>
    <q-skeleton v-if="!post" />
    <template v-else>
      <q-card-section>
        {{ post.title }}
        {{ post.createdAt }}
      </q-card-section>
      <q-card-section>
        <editor-content :editor="editor" />
      </q-card-section>
    </template>
    <q-card-actions>
      <q-btn
        to="/post"
        label="list"
      />
      <q-btn
        :to="`/post/update/${id}`"
        label="modify"
      />
    </q-card-actions>
  </q-card>
</template>
