<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { setPost, deletePost } from 'src/models/Post'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps<{
  id: string,
  title: string,
  content: string
}>()
const $q = useQuasar()

const postTitle = ref(props.title)
const postContent = ref(props.content)

const existsRule = (val: string) => (val && val.length > 0) || '내용을 넣어주세요.'
const router = useRouter()

const onSubmit = async () => {
  if (props.id) {
    if (props.title !== postTitle.value) await deletePost(props.id)
  }
  const html = editor.value?.getHTML()
  const id = await setPost(postTitle.value, html)
  $q.notify({
    message: '게시글이 저장되었습니다.',
    timeout: 0,
    actions: [
      { label: '확인', color: 'white', handler: () => { /* */ } }
    ]
  })
  await router.push(`/post/${id}`)
}

const onReset = () => {
  postTitle.value = ''
  postContent.value = ''
}

const editor = useEditor({
  content: postContent.value,
  extensions: [
    StarterKit
  ]
})

const test = () => {
  const r = editor.value?.getHTML()
  console.log(r)
}

</script>
<template>
  <q-card>
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <v-card>
        <q-card-section>
          <q-input
            v-model="postTitle"
            filled
            label="제목"
            hint="제목을 넣어주세요."
            lazy-rules
            :rules="[ existsRule ]"
          />

          <EditorContent :editor="editor" />
          <!--<q-input
            v-model="postContent"
            filled
            type="textarea"
            label="내용"
            hint="내용을 넣어주세요."
            lazy-rules
            :rules="[ existsRule ]"
          />-->
        </q-card-section>
        <q-card-actions>
          <div>
            <q-btn
              label="test"
              @click="test"
            />
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-card-actions>
      </v-card>
    </q-form>
  </q-card>
</template>
