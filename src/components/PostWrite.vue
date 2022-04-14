<script setup lang="ts">
import { ref } from 'vue'
import { db } from 'src/boot/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const title = ref('')
const content = ref('')

const existsRule = (val: string) => (val && val.length > 0) || '내용을 넣어주세요.'

const onSubmit = async () => {
  try {
    await setDoc(doc(db, 'posts', title.value), {
      title: title.value,
      content: content.value
    })
    $q.notify({
      message: '게시글이 저장되었습니다.',
      timeout: 0,
      actions: [
        { label: '확인', color: 'white', handler: () => { /* */ } }
      ]
    })
  } catch (e) {
    console.error(e)
  }
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
