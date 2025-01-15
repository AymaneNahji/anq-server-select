<template>
    <q-select v-bind="props"
        v-model="modelValue" :options="data.options" @filter="handleFilter" use-input :input-value="data.inputValue"
        :loading="data.isLoading" @update:input-value="data.inputValue = $event">
        <template v-for="(_, name, index) in slots" #[name]="slotData" :key="index">
            <slot :name="name" v-bind="(slotData as any)" :key="index"> </slot>
        </template>
    </q-select>
</template>

<script setup lang="ts">
import axios, { AxiosInstance } from 'axios';
import { QSelect, QSelectProps, QSelectSlots } from 'quasar';
import { onBeforeMount, reactive } from 'vue';

type Props = {
    link: string,
    defaultOptions?: any[],
    axiosInterceptor?: AxiosInstance,
    searchParam?: string
} & Omit<QSelectProps, 'options'>;

const props = withDefaults(defineProps<Props>(), {
    dark: undefined,
    optionsDark: undefined
});

const modelValue = defineModel<QSelect['modelValue']>()

const slots = defineSlots<QSelectSlots>();

const emit = defineEmits<{
    (e: 'update:options', val: any[]): void;
    (e: 'filter', val: string): void;
    (e: 'loading', val: boolean): void;
    (e: 'error', val: unknown): void;
}>();


const data = reactive({
    options: props.defaultOptions || [] as any[],
    inputValue: '', // Track the user's input value
    isLoading: false,
});



const handleFilter: ((inputValue: string, doneFn: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void, abortFn: () => void) => void) = (value: string, doneFn) => {
    // for stop the defaut filter loading
    doneFn(() => { })

    emit('filter', value); // Emit the filter event
    // if (!value) {
    //     // If input is empty, reset to default options
    //     data.options = props.defaultOptions || [];
    //     emit('update:options', data.options); // Emit options update
    //     return;
    // }

    data.isLoading = true;
    emit('loading', true); // Emit loading state

    (props.axiosInterceptor || axios).get(props.link, {
        params: { [(props.searchParam || 'search')]: value }, // Pass the filter value as a query parameter
    }).then(response => {

        doneFn(() => {
            data.options = response.data || [];
        })
        emit('update:options', data.options); // Emit options update
    }).catch((error) => {

        console.error('Error fetching filtered options:', error);
        emit('error', error); // Emit error event
    }).finally(() => {

        data.isLoading = false;
        emit('loading', false); // Emit loading state
    })

};

onBeforeMount(() => {
    (props.axiosInterceptor || axios).get(props.link, {
        params: { [(props.searchParam || 'search')]: '' }, // Pass the filter value as a query parameter
    }).then(response => {
        data.options = response.data || [];
        emit('update:options', data.options); // Emit options update
    }).catch((error) => {

        console.error('Error fetching filtered options:', error);
        emit('error', error); // Emit error event
    }).finally(() => {

        data.isLoading = false;
        emit('loading', false); // Emit loading state
    })
})

defineOptions({
    inheritAttrs: false
})
</script>

<style scoped></style>
