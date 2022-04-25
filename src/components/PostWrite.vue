<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { Post, setPost } from 'src/models/Post'
import { doc } from 'firebase/firestore'
import { db } from 'boot/firebase'
import { firebaseUser } from 'src/composables/useAuth'

const $q = useQuasar()

const title = ref('')
const content = ref('')

const existsRule = (val: string) => (val && val.length > 0) || '내용을 넣어주세요.'
const router = useRouter()
const route = useRoute()

const onSubmit = async () => {
  if (!firebaseUser.value) throw Error('user not signed')
  const userRef = doc(db, 'user', firebaseUser.value.uid)
  await setPost(new Post(title.value, content.value, userRef))
  $q.notify({
    message: '게시글이 저장되었습니다.',
    timeout: 0,
    actions: [
      { label: '확인', color: 'white', handler: () => { /* */ } }
    ]
  })
  const listPath = '/' + route.params.menu
  await router.push(listPath)
}

const onReset = () => {
  title.value = ''
  content.value = ''
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
            v-model="title"
            filled
            label="제목"
            hint="제목을 넣어주세요."
            lazy-rules
            :rules="[ existsRule ]"
          />

          <q-input
            v-model="content"
            filled
            type="textarea"
            label="내용"
            hint="내용을 넣어주세요."
            lazy-rules
            :rules="[ existsRule ]"
          />
        </q-card-section>
        <q-card-actions>
          <div>
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
