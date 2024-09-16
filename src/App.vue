<script setup lang="ts">
import { ref } from 'vue';
import { AnModal } from '.';
import { QBtn } from 'quasar';

const modalRef = ref<InstanceType<typeof AnModal>>()
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  hhhh
  <QBtn color="primary" label="Open modal" @click="modalRef?.show()" />
  <!-- <AnComponent msg="Vite + Vue" /> -->
  <AnModal ref="modalRef" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
