<template>
  <div :class="`flex ${$attrs.class || ''}`">
    <q-select v-bind="props.countryProps" v-model="data.selectedCountry"
      @update:model-value="val => emit('selectCountry', val)" :options="getCountries()"
      :label="props.countryProps?.label || 'Country'" ref="countrySelect" class="min-w-28">
      <template #option="props">
        <q-item v-bind="props.itemProps">
          {{ props.opt.name }} (+{{ props.opt.phone[0] }})
        </q-item>
      </template>
      <template #selected-item="props">
        {{ props.opt.name }}
      </template>
      <template v-for="(_, name, index) in slots" #[removeCountrySelectSlotsPrefix(name.toString())]="slotData" :key="index">
            <slot v-if="name.toString().startsWith('country-select-')" :name="name" v-bind="(slotData as any)" :key="index"> </slot>
        </template>
    </q-select>

    <!-- Phone Number Input -->
    <q-input v-bind="getInputProps()" v-model="data.phoneNumber" :rules="[phoneNumberRule]" label="Phone Number"
      ref="phoneInput" class="phone-input"
      @keypress="(e) => onlyNumberCharactersRegex.test(e.key) ? undefined : e.preventDefault()">
      <template v-for="(_, name, index) in slots" #[name]="slotData" :key="index">
            <slot v-if="!name.toString().startsWith('country-select-')" :name="name" v-bind="(slotData as any)" :key="index"> </slot>
        </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { getCountryData, getCountryDataList, ICountryData, TCountryCode } from 'countries-list';
import { reactive, ref, watch } from 'vue';
import parsePhoneNumber from 'libphonenumber-js'
import { QInput, QInputProps, QInputSlots, QSelect, QSelectProps, QSelectSlots } from 'quasar';
import { inferClosestCountry, onlyNumberCharactersRegex } from './functions';

type Props = {
  countryProps?: {
    excludeCountries?: TCountryCode[];
    defaultCountry?: TCountryCode
  } & Omit<QSelectProps, 'modelValue'>
} & QInputProps

type Slots = {
  [K in keyof QSelectSlots as`country-select-${K}`]: QSelectSlots[K]
} & QInputSlots

const slots = defineSlots<Slots>()

const removeCountrySelectSlotsPrefix = (val: string) => val.replace('country-select-', '')

// const getFlagEmoji = (countryCode:TCountryCode)=>String.fromCodePoint(...countryCode.toUpperCase().split("")
// .map((char) => 127397 + char.charCodeAt(0)))


const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'selectCountry', value: ICountryData): void;
}>()



const getInputProps = () => {
  const p = { ...props }
  delete p.countryProps
  delete p.modelValue
  delete p['onUpdate:modelValue']
  return p
}

const getCountries = () => {
  if (props.countryProps?.excludeCountries) {
    return getCountryDataList().filter(i => !props.countryProps?.excludeCountries?.includes(i.iso2))
  }
  return getCountryDataList()
}

const getDefaultCountry = () => {
  if (getCountries().length == 0) {
    throw Error("You can't exclude all countries, let at least one.")
  }
  if (props.countryProps?.defaultCountry) {
    return getCountryData(props.countryProps?.defaultCountry)
  }
  return getCountries()[0]
}

// Props for v-model binding
const props = defineProps<Props>();

const phoneNumberRule = (val: any) => {
  if (val && !parsePhoneNumber(`+${data.selectedCountry.phone[0]}${val.toString()}`)?.isValid()) {
    return data.selectedCountry ? `Enter a valid ${data.selectedCountry.name} phone number.` : 'Enter a valid phone number.'
  }
  return true
}

const data = reactive({
  phoneNumber: '',
  selectedCountry: getDefaultCountry(),
})


const setCountry = () => {
  phoneInput.value?.validate()
  if (data.selectedCountry) {
    const phone = `+${data.selectedCountry.phone[0]}${data.phoneNumber || ''}`
    emit('update:modelValue', phone)
  }
}

const setPhoneNumber = () => {
  if (data.phoneNumber) {
    const phone = `+${data.selectedCountry.phone[0]}${data.phoneNumber || ''}`
    emit('update:modelValue', phone)
  }
}


watch([() => data.phoneNumber, () => data.selectedCountry], () => {
  setCountry()
  setPhoneNumber()
})

watch(() => props.modelValue, () => {
  // console.log(getFlagEmoji('US'));
  
  if (props.modelValue?.toString() == `+${data.selectedCountry.phone[0]}${data.phoneNumber}`)
    return
  // console.log("---------------------------------------------------");
  // console.log(props.modelValue?.toString());
  // console.log(inferClosestCountry(props.modelValue?.toString() || ''));
  // console.log("---------------------------------------------------");

  const countryCode = inferClosestCountry(props.modelValue?.toString() || '')
  if (countryCode && getCountries().map(i => i.iso2).includes(countryCode as any)) {
    data.selectedCountry = countryCode ? getCountryData(countryCode as any) : getDefaultCountry()
    data.phoneNumber = (props.modelValue?.toString() || '').replace(`+${data.selectedCountry.phone[0]}`, '').replace('+', '')
  } else {
    console.error(`the phone number ${props.modelValue?.toString()} not valid, please include an existing country phone number prefix like (+${getDefaultCountry().phone[0]}....)`)
  }

})

// Refs for DOM elements
const countrySelect = ref<QSelect>();
const phoneInput = ref<QInput>();
</script>

<style scoped>
.phone-input {
  flex-grow: 1;
}
</style>