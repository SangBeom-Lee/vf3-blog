<script setup lang="ts">
import AuthBtn from '../components/auth/AuthBtn.vue'
</script>
<template>
  <q-layout
    view="hhh lpr fff"
    :container="false"
  >
    <q-header>
      <q-toolbar>
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
