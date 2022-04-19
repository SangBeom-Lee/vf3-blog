<script setup lang="ts">
import { ref } from 'vue'
import AuthBtn from '../components/auth/AuthBtn.vue'

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = function () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const links1 = [
  { icon: 'home', text: 'Home', to: '/' },
  { icon: 'whatshot', text: 'Board', to: '/post' },
  { icon: 'subscriptions', text: 'Movie Search', to: '/movie' }
]

</script>
<template>
  <q-layout
    view="hhh lpr fff"
    :container="false"
  >
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          icon="menu"
          @click="toggleLeftDrawer"
        />
        <q-space />
        <AuthBtn />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="link in links1"
            :key="link.text"
            v-ripple
            clickable
            :to="link.to"
          >
            <q-item-section
              avatar
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
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
