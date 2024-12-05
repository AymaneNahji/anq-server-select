<template>
  <div class=" border border-gray-500 rounded-lg px-2">

    <!-- Phone Number Input -->
    <q-input v-model="data.phoneNumber" borderless dense type="tel" label="Phone Number" ref="phoneInput"
      class="phone-input">
      <template v-slot:prepend>
        <q-select v-model="data.selectedCountry" borderless
          :options="getCountryDataList()" dense
          label="Country" ref="countrySelect" class="min-w-28">
          <template #option="props">
            <q-item v-bind="props.itemProps">
              {{ props.opt.name }} (+{{ props.opt.phone[0] }})
            </q-item>
          </template>
          <template #selected-item="props">
              {{ props.opt.name }}
          </template>
        </q-select>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { getCountryData, getCountryDataList } from 'countries-list';
import { reactive, ref, watch } from 'vue';
import parsePhoneNumber from 'libphonenumber-js'


const x = parsePhoneNumber('+212535980022')

const emit = defineEmits<{
  (e:'update:modelValue',value:string):void
}>()

// Props for v-model binding
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

// // Emit for v-model
// const emit = defineEmits<{
//   (event: 'update:modelValue', value: { country: string; phoneNumber: string }): void;
// }>();


// Local state that syncs with v-model
const data = reactive({
  selectedCountry: parsePhoneNumber(props.modelValue)?.isPossible()?getCountryData(parsePhoneNumber(props.modelValue)?.country as any):getCountryData('US'),
  phoneNumber: parsePhoneNumber(props.modelValue)?.isPossible()?parsePhoneNumber(props.modelValue)?.nationalNumber:undefined,
});

// // Watch for changes in local state and sync with parent via v-model
watch(data, (newValue) => {
  const phone = `+${newValue.selectedCountry?.phone[0] || ''}${newValue.phoneNumber || ''}`
  emit('update:modelValue', phone)
});



// Refs for DOM elements
const countrySelect = ref(null);
const phoneInput = ref(null);
</script>

<style scoped>
.phone-input {
  flex-grow: 1;
}
</style>