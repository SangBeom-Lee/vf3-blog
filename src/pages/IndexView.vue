<script setup lang="ts">
const linkWrite = () => {
  location.href = '/write'
}
</script>
<template>
  IndexView
  <q-page>
    <q-btn
      flat
      dense
      icon="add"
      @click="linkWrite"
    >
      write
    </q-btn>
  </q-page>
</template>
