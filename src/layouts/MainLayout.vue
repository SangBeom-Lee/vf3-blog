<script setup lang="ts">
import AuthBtn from '../components/auth/AuthBtn.vue'
import MenuView from '../components/menu/MenuView.vue'

</script>
<template>
  <q-layout
    view="hhh lpr fff"
    :container="false"
  >
    <q-header>
      <q-toolbar>
        <MenuView />
        Beom-dev
        <q-space />
        <AuthBtn />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
