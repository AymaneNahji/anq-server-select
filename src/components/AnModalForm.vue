<template>
    <q-dialog v-model="data.open" :persistent="props.isLoading || props.formIsLoading" @hide="hide">
        <q-card v-bind="props.modalCardProps" :class="`container ${props.modalCardProps?.class || ''}`">
            <q-card-section class="flex items-center justify-between">
                <h2 class="font-bold text-2xl">{{ props.title }}</h2>
                <slot name="close-icon-btn" :color="props.btnsColor" :disable="props.isLoading || props.formIsLoading">
                    <q-btn icon="close" :color="props.btnsColor" round flat v-close-popup :disable="props.isLoading || props.formIsLoading" />
                </slot>
            </q-card-section>
            <q-form @submit="e=>emit('submit',e)" class="flex flex-col">
                <q-card-section class="flex flex-col gap-2">
                    <slot name="content"></slot>
                </q-card-section>
                <q-separator />
                <q-card-section class="flex items-center justify-end gap-2" >
                    <slot name="cancel-btn" :color="props.btnsColor" :disable="props.isLoading || props.formIsLoading" :label="props.cancelLabel">
                        <q-btn :color="props.btnsColor" type="button" unelevated flat class="border border-solid" :disable="props.isLoading || props.formIsLoading" :label="props.cancelLabel" no-caps v-close-popup />
                    </slot>
                    <slot name="ok-btn" :color="props.btnsColor" :label="props.okLabel" :disable="props.isLoading" :loading="props.formIsLoading">
                        <q-btn :color="props.btnsColor" type="submit" unelevated :label="props.okLabel" no-caps :disable="props.isLoading" :loading="props.formIsLoading" />
                    </slot>
                </q-card-section>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { QBtnProps, QCard } from 'quasar';
import { reactive } from 'vue';

const emit = defineEmits<{
    (event:'submit',evt: Event | SubmitEvent):void;
    (event:'hide'):void;
}>()

const props = defineProps({
    isLoading:{
        type:Boolean,
        default:false
    },
    formIsLoading:{
        type:Boolean,
        default:false
    },
    okLabel:{
        type:String,
        default:'Ok'
    },
    cancelLabel:{
        type:String,
        default:'Cancel'
    },
    title:{
        type:String,
        default:'Title'
    },
    btnsColor:{
        type: Object as ()=> QBtnProps['color'],
        default:'primary' as QBtnProps['color']
    },
    modalCardProps:{
        type: Object as ()=>({class?:string;style?:string}&InstanceType<typeof QCard>['$props']),
        required: false,
    }
})

const data = reactive({
    open:false
})

const show = ()=>{
    data.open = true;
}
const hide = ()=>{
    data.open = false;
    emit('hide')
}

defineExpose({show,hide})
</script>

<style scoped>

</style>