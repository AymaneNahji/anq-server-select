<template>
    <q-dialog v-model="data.open" :persistent="props.persistent" @hide="hide">
        <q-card v-bind="props.modalCardProps" :class="`container ${props.modalCardProps?.class || ''}`">
            <q-card-section class="flex items-center justify-between">
                <h2 class="font-bold text-2xl">{{ props.title }}</h2>
                <slot name="close-icon-btn" :color="props.btnsColor" :disable="props.persistent">
                    <q-btn icon="close" :color="props.btnsColor" round flat v-close-popup :disable="props.persistent" />
                </slot>
            </q-card-section>
            <div class="flex flex-col">
                <q-card-section class="flex flex-col gap-2">
                    <slot name="content"></slot>
                </q-card-section>
                <q-separator v-if="!hideActions" />
                <q-card-section v-if="!hideActions" class="flex items-center justify-end gap-2" >
                    <slot name="cancel-btn" :color="props.btnsColor" :disable="props.persistent" :label="props.cancelLabel">
                        <q-btn :color="props.btnsColor" type="button" unelevated flat class="border border-solid" :disable="props.persistent" :label="props.cancelLabel" no-caps v-close-popup />
                    </slot>
                    <slot name="ok-btn" :click="()=>emit('okClick')" :color="props.btnsColor" :label="props.cancelLabel">
                        <q-btn v-if="!hideOkBtn" @click="emit('okClick')" :color="props.btnsColor" type="button" unelevated :label="props.okLabel" no-caps/>
                    </slot>
                </q-card-section>
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { QBtnProps, QCard } from 'quasar';
import { reactive } from 'vue';

const emit = defineEmits<{
    (event:'okClick'):void;
    (event:'hide'):void;
}>()

const props = defineProps({
    persistent:{
        type:Boolean,
        default:false
    },
    hideOkBtn:{
        type:Boolean,
        default:false
    },
    hideActions:{
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