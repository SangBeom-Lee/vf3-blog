<script setup lang="ts">
import AuthBtn from '../components/auth/AuthBtn.vue'

const drawer = false
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
          round
          dense
          icon="menu"
          class="q-mr-sm"
          @click="drawer != drawer"
        />
        vf3
        <q-space />
        <AuthBtn />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
