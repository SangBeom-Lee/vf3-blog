<script setup lang="ts">
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = function () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const menuList = [
  {
    icon: 'mdi-clipboard-check',
    label: 'Post',
    separator: true
  }
]

</script>
<template>
  <q-btn
    dense
    flat
    round
    icon="menu"
    @click="toggleLeftDrawer"
  />
  <q-drawer
    v-model="leftDrawerOpen"
    side="left"
    behavior="mobile"
    elevated
  >
    <q-scroll-area>
      <q-list
        v-for="(menu, index) in menuList"
        :key="index"
      >
        <q-item
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section>
            Inbox
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    <!-- drawer content -->
  </q-drawer>
</template>
