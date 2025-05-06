<template>
  <div class="p-5">
    <AnqServerSelect
      v-model="selectedCountry"
      label="Select Country"
      link="https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag"
      :defaultOptions="countries"
      @filter="onFilter"
      @loading="onLoading"
      @error="onError"
      :option-label="(opt) => opt.name.common"
    >
      <!-- <template #option="{ opt }">
        <div class="flex items-center gap-2">
          <span>{{ opt.flag }}</span>
          <span>{{ opt.name }}</span>
        </div>
      </template> -->
    </AnqServerSelect>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AnqServerSelect from './components/AnqServerSelect.vue';

const selectedCountry = ref(null);

const onFilter = (value: string) => {
  console.log('Filtering with:', value);
};

const onLoading = (isLoading: boolean) => {
  console.log('Loading:', isLoading);
};

const onError = (error: unknown) => {
  console.error('Error:', error);
};
</script>

<style scoped></style>