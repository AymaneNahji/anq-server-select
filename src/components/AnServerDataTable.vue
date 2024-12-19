<template>
    <div class="flex flex-col flex-nowrap gap-2 w-full">

        <q-table :loading="props.loading || data.tableIsLoading" :hide-bottom="props.hidePagination" :flat="props.flat"
            :square="props.square" :title="props.title" :columns="props.columns"
            :rows="(data.rows[props.paginationResponseKeys.results] as unknown as any[])"
            v-model:pagination="data.pagination" @request="onRequest" wrap-cells class="w-full"
            v-bind="{ onRowClick: props.enableRowClick ? (_evt, row, index) => { emit('rowClick', row, index) } : undefined, }">
            <template #top>
                <div class="q-table__top relative-position row items-center w-full">
                    <div class="flex w-full items-center gap-2 justify-between">
                        <div class="q-table__title">
                            <slot name="title">
                                {{ props.title }}
                            </slot>
                        </div>
                        <div class="flex items-center gap-2">

                            <template v-if="props.hasSearch">
                                <slot name="search-input" :loading="data.searchIsLoading" :value="data.search" :search="(val:string)=>{data.search = val ; onSearch()}">
                                    <q-input v-if="props.hasSearch" label="Search" dense v-model="data.search"
                                        @update:model-value="onSearch" clearable :debounce="500" class="!items-start"
                                        outlined :loading="data.searchIsLoading" />
                                </slot>
                            </template>
                            <template v-if="props.hasFilter">
                                <slot name="filter-btn" label="Filter" color="primary" :click="()=>filterModal?.show()">
                                    <q-btn label="Filter" no-caps color="primary" @click="filterModal?.show()" />
                                </slot>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
            <template #bottom>
                <div class=" w-full flex justify-center items-center">
                    <q-pagination v-model="data.pagination.page" :max-pages="6"
                        :max="(data.rows[props.paginationResponseKeys.lastPage] as unknown as number)"
                        @update:model-value="fetchData" direction-links boundary-links />
                </div>
            </template>
            <template v-for="(_, name, index) in slots" #[name]="slotData" :key="index">
                <slot v-if="!name.toString().startsWith('filter-modal-')" :name="(name as any)" v-bind="(slotData as any)">
                </slot>
            </template>
        </q-table>
    </div>
    <AnModalForm ref="filterModal" v-bind="props.filterModalData.props"
        :ok-label="props.filterModalData.props?.okLabel || 'Filter'" :title="props.filterModalData.props?.title || 'Filter'"
        @submit="onFilter" :form-is-loading="data.filterIsLoading">
        <template #content>
            <template v-for="(field, index) in props.filterModalData.fields" :key="index">
                <template v-if="field.type == 'text'">
                    <q-input outlined :label="field.label" v-model="data.filter[field.urlParam]" clearable />
                </template>
                <template v-if="field.type == 'date-time'">
                    <q-input outlined :label="field.label" v-model="data.filter[field.urlParam]" readonly
                        class="[&>div>div:before]:!border-solid">
                        <template #append>
                            <div class="q-field__append q-field__marginal row no-wrap items-center q-anchor--skip">
                                <button v-if="data.filter[field.urlParam]" @click="data.filter[field.urlParam] = ''"
                                    class="q-icon notranslate material-icons q-field__focusable-action" tabindex="0"
                                    type="button">
                                    cancel
                                </button>
                            </div>
                            <q-btn icon="calendar_month">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale" class="p-2">
                                    <div class="q-gutter-md row items-start">
                                        <q-date v-model="data.filter[field.urlParam]" mask="YYYY-MM-DD HH:mm">
                                            <div class="row items-center justify-end q-gutter-sm">
                                                <q-btn label="Close" color="primary" flat v-close-popup />
                                            </div>
                                        </q-date>
                                        <q-time v-model="data.filter[field.urlParam]" mask="YYYY-MM-DD HH:mm" />
                                    </div>
                                </q-popup-proxy>
                            </q-btn>
                        </template>
                    </q-input>
                </template>
                <template v-if="field.type == 'date'">
                    <q-input outlined :label="field.label" v-model="data.filter[field.urlParam]" readonly
                        class="[&>div>div:before]:!border-solid">
                        <template #append>
                            <div class="q-field__append q-field__marginal row no-wrap items-center q-anchor--skip">
                                <button v-if="data.filter[field.urlParam]" @click="data.filter[field.urlParam] = ''"
                                    class="q-icon notranslate material-icons q-field__focusable-action" tabindex="0"
                                    type="button">
                                    cancel
                                </button>
                            </div>
                            <q-btn icon="calendar_month">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <div class="q-gutter-md row items-start">
                                        <q-date v-model="data.filter[field.urlParam]" mask="YYYY-MM-DD">
                                            <div class="row items-center justify-end q-gutter-sm">
                                                <q-btn label="Close" color="primary" flat v-close-popup />
                                            </div>
                                        </q-date>
                                    </div>
                                </q-popup-proxy>
                            </q-btn>
                        </template>
                    </q-input>
                </template>
                <template v-if="field.type == 'time'">
                    <q-input outlined :label="field.label" v-model="data.filter[field.urlParam]" readonly
                        class="[&>div>div:before]:!border-solid">
                        <template #append>
                            <div class="q-field__append q-field__marginal row no-wrap items-center q-anchor--skip">
                                <button v-if="data.filter[field.urlParam]" @click="data.filter[field.urlParam] = ''"
                                    class="q-icon notranslate material-icons q-field__focusable-action" tabindex="0"
                                    type="button">
                                    cancel
                                </button>
                            </div>
                            <q-btn icon="calendar_month">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <div class="q-gutter-md row items-start">
                                        <q-time v-model="data.filter[field.urlParam]" mask="HH:mm">
                                            <div class="row items-center justify-end q-gutter-sm">
                                                <q-btn label="Close" color="primary" flat v-close-popup />
                                            </div>
                                        </q-time>
                                    </div>
                                </q-popup-proxy>
                            </q-btn>
                        </template>
                    </q-input>
                </template>
                <template v-if="field.type == 'number'">
                    <q-input outlined type="number" :label="field.label" v-model="data.filter[field.urlParam]" clearable />
                </template>
                <template v-if="field.type == 'boolean-checkbox'">
                    <q-checkbox :label="field.label"
                        :model-value="data.filter[field.urlParam] ? data.filter[field.urlParam] : false"
                        @update:model-value="(val: boolean) => data.filter[field.urlParam] = val" />
                </template>
                <template v-if="field.type == 'checkboxs'">
                    <div class="font-bold">{{ field.label }}</div>
                    <q-option-group type="checkbox" :model-value="data.filter[field.urlParam] || []"
                        @update:model-value="(val: any[]) => data.filter[field.urlParam] = val"
                        :options="field.choices || []" />
                </template>
                <template v-if="field.type == 'radios'">
                    <div class="font-bold">{{ field.label }}</div>
                    <q-option-group type="radio" v-model="data.filter[field.urlParam]" :options="field.choices || []" />
                </template>
                <template v-if="field.type == 'select'">
                    <q-select outlined :label="field.label" v-model="data.filter[field.urlParam]" emit-value map-options
                        :options="field.choices || []" clearable />
                </template>
                <template v-if="field.type == 'select-multiple'">
                    <q-select outlined :label="field.label" :model-value="data.filter[field.urlParam] || []"
                        @update:model-value="(val: any[]) => data.filter[field.urlParam] = val" multiple emit-value
                        map-options :options="field.choices || []" clearable />
                </template>
            </template>
        </template>
        <template v-for="(_, name, index) in slots" #[removeFilterModalSlotsPrefix(name.toString())]="slotData" :key="index">
            <slot v-if="name.toString().startsWith('filter-modal-')" :name="name" v-bind="(slotData as any)"></slot>
        </template>


    </AnModalForm>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { QTableColumn, QTableSlots } from 'quasar';
import { onBeforeMount, reactive, ref } from 'vue';
import AnModalForm from './AnModalForm.vue';
import axios, { AxiosInstance } from 'axios';

type Paginated<T = any> = {
    count: number;
    lastPage: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

type Filter = {
    [key: string]: any
}
type Pagination = { page?: number, page_size?: number }
type FilterModalSlots = InstanceType<typeof AnModalForm>['$slots']
export type AnServerDataTableSlots = QTableSlots & {
    [K in keyof FilterModalSlots as K extends "content" ? string : `filter-modal-${K}`]: FilterModalSlots[K]
} & {
    "title"?(_: {}): any;
    "search-input"?(_: {
        loading:boolean;
        value:string;
        search:(val:string)=>void;
    }): any;
    "filter-btn"?(_: {
        label:string;
        color:string;
        click:()=>void;
    }): any;
}
export type FilterModalData = {
    fields: {
        type: 'boolean-checkbox'
        | 'checkboxs'
        | 'radios'
        | 'text'
        | 'select'
        | 'select-multiple'
        | 'number'
        | 'date'
        | 'time'
        | 'date-time';
        label: string;
        urlParam: string;
        defaultValue?: any;
        choices?: {
            label: string;
            value: string | number | any;
        }[];
    }[];
    props?: InstanceType<typeof AnModalForm>['$props']
}

const filterModal = ref<InstanceType<typeof AnModalForm>>();

const emit = defineEmits<{
    (event: 'openFilter'): void;
    (event: 'rowClick', row: any, index: number): void;
    (event: 'getDataSuccessfuly', data: any): void;
    (event: 'getDataError', error: any): void;
}>()

const props = defineProps({
    columns: {
        type: Object as () => QTableColumn[],
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    linkParams: {
        type: Object as () => {
            [key: string]: string | number
        },
        default: {}
    },
    title: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    },
    hidePagination: {
        type: Boolean,
        default: false
    },
    flat: {
        type: Boolean,
        default: false
    },
    square: {
        type: Boolean,
        default: false
    },
    hasSearch: {
        type: Boolean,
        default: false
    },
    hasFilter: {
        type: Boolean,
        default: false
    },
    enableRowClick: {
        type: Boolean,
        default: false
    },
    filterModalData: {
        type: Object as () => FilterModalData,
        default: {
            fields: []
        } as FilterModalData,
    },
    axiosInterceptor: {
        type: Object as () => AxiosInstance,
        required: false
    },
    paginationResponseKeys: {
        type: Object as () => { [K in keyof Paginated]: string },
        default: {
            count: "count",
            lastPage: "lastPage",
            next: "next",
            previous: "previous",
            results: "results",
        } as { [K in keyof Paginated]: string }
    },
    orderingKey: {
        type: String,
        default: "ordering",
    }
})

const slots = defineSlots<AnServerDataTableSlots>()

const removeFilterModalSlotsPrefix = (val: string) => val.replace('filter-modal-', '')

const defaultPagination = {
    descending: false,
    page: 1,
    rowsPerPage: 10,
    sortBy: null as string | null,
    rowsNumber: 10,
}

const data = reactive({
    dataIsLoading: false,
    tableIsLoading: false,
    rows: {
        [props.paginationResponseKeys.results]: [] as any[]
    },
    pagination: defaultPagination,
    filter: {} as Filter,
    ordering: undefined as string | undefined,
    search: '',
    searchIsLoading: false,
    filterIsLoading: false,
})

const fetchData = async () => {
    // console.log(data.filter);

    if (props.link) {
        data.ordering = getOrderingText()
        data.tableIsLoading = true
        await apiGetData({ pagination: { page: data.pagination.page }, filter: data.filter, ordering: data.ordering, search: data.search }).then(res => {
            data.rows = res.data as any
            emit('getDataSuccessfuly', res.data)
        })
            .catch(error => {
                emit('getDataError', error)
            })
            .finally(() => {
                data.tableIsLoading = false
                filterModal.value?.hide()
            })
    }
}

const onRequest = (val: {
    pagination: {
        sortBy: string;
        descending: boolean;
        page: number;
        rowsPerPage: number;
    }
}) => {
    data.pagination = {
        ...data.pagination,
        ...val.pagination
    }

    fetchData()
}

const getOrderingText = () => {
    if (data.pagination.sortBy) {
        if (data.pagination.descending) {
            return '-' + data.pagination.sortBy
        }
        return data.pagination.sortBy
    }
    return ''
}

const onSearch = () => {
    data.searchIsLoading = true;
    filter({ search: data.search })
        .finally(() => {
            data.searchIsLoading = false;
        })
}

const onFilter = () => {
    data.filterIsLoading = true;
    filter(data.filter).then(() => {
        data.filterIsLoading = false;
        filterModal.value?.hide()
    })
}


onBeforeMount(() => {
    data.dataIsLoading = true
    fetchData().finally(() => {
        data.dataIsLoading = false
    })
})

const apiGetData = (data?: { pagination?: Pagination, filter?: Filter, ordering?: string, search: string }) => {

    return (props.axiosInterceptor || axios).get<Paginated>(props.link, {
        params: {
            ...data?.pagination,
            ...data?.filter,
            [props.orderingKey]: data?.ordering,
            ...props.linkParams
        }
    })
}

const filter = (dataFilter: Filter) => {

    let filter = {} as Filter

    Object.keys(dataFilter).forEach((key) => {
        filter[key] = (dataFilter[key] || '').toString()
        // const field = props.filterModalData.fields.find(i=>i.urlParam === key)
        // if(field){
        //     if(field.type === 'checkboxs' || field.type === 'select-multiple'){

        //     }
        // }else{
        //     filter[key] = dataFilter[key]
        // }
    })
    data.filter = filter;
    return fetchData().finally(() => {
        data.filter = dataFilter
    })
}

defineExpose({ filter, fetchData })


</script>

<style scoped></style>
