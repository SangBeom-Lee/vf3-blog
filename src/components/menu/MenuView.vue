<script setup lang="ts">
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

const links1 = [
  { icon: 'home', text: 'Home', to: '/' },
  { icon: 'whatshot', text: 'Board', to: '/post' },
  { icon: 'subscriptions', text: 'Movie Search', to: '/movie' }
]

</script>
<template>
  <q-drawer
    v-model="leftDrawerOpen"
    side="left"
    behavior="mobile"
    elevated
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item
          v-for="link in links1"
          :key="link.text"
          v-ripple
          clickable
        >
          <q-item-section
            avatar
            to="{{ link.to }}"
          >
            <q-icon
              color="grey"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>
        <!-- drawer content -->
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
