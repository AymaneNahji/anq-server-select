<template>
  <q-btn label="Edit number" @click="data.phone = '+212635980044'" color="primary" />
  <q-form @submit="onSubmit" class="mx-auto container border-2">
    <q-card class="p-5 flex flex-col gap-5">
      <AnPhoneNumberInput v-model="data.phone" outlined :country-props="{outlined:true,dense:true,excludeCountries:['MA']}" class="gap-3" dense />
      {{ data.phone }}
      <q-btn label="Submit" type="submit" color="primary" />
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import AnServerDataTable, { FilterModalData } from './components/AnServerDataTable.vue';
import AnServerSelect from './components/AnServerSelect.vue';
import AnPhoneNumberInput from './components/AnPhoneNumberInput.vue';
import { onBeforeMount, reactive } from 'vue';


const data = reactive({
  phone: ''
})

onBeforeMount(()=>{
  setTimeout(()=>{
    data.phone = '+212635980022'
  },2000)
})

const onSubmit = () => {
  console.log(data)
}

type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  origin_price: string;
  discount_percentage: string;
  price: number;
  image: string;
  avg_rating: number;
  ratings_count: number;
  category: number;
  brand: number | null;
  has_variants: boolean;
};

const filterModalData: FilterModalData = {
  fields: [
    {
      label: "Popular domain",
      type: 'checkboxs',
      urlParam: 'products_domain',
      choices: [
        {
          label: 'Skinecare',
          value: "skinecare"
        },
        {
          label: 'Gaming',
          value: "gaming"
        },
      ],
      defaultValue: 'gaming'
    },
  ],
}

const cols: QTableColumn<Product>[] = [
  {
    field: 'id',
    label: 'ID',
    name: 'id',
    align: 'left',
    sortable: true,
  },
  {
    field: 'slug',
    label: 'Slug',
    name: 'slug',
    align: 'left',
    sortable: true,
  },
  {
    field: 'name',
    label: 'Name',
    name: 'name',
    align: 'left',
    sortable: true,
  },
  {
    field: 'description',
    label: 'Description',
    name: 'description',
    align: 'left',
    sortable: false,
  },
  {
    field: 'origin_price',
    label: 'Original Price',
    name: 'origin_price',
    align: 'right',
    sortable: true,
  },
  {
    field: 'discount_percentage',
    label: 'Discount %',
    name: 'discount_percentage',
    align: 'right',
    sortable: true,
  },
  {
    field: 'price',
    label: 'Price',
    name: 'price',
    align: 'right',
    sortable: true,
  },
  {
    field: 'image',
    label: 'Image',
    name: 'image',
    align: 'left',
    sortable: false,
  },
  {
    field: 'avg_rating',
    label: 'Avg Rating',
    name: 'avg_rating',
    align: 'right',
    sortable: true,
  },
  {
    field: 'ratings_count',
    label: 'Ratings Count',
    name: 'ratings_count',
    align: 'right',
    sortable: true,
  },
  {
    field: 'category',
    label: 'Category',
    name: 'category',
    align: 'left',
    sortable: true,
  },
  {
    field: 'brand',
    label: 'Brand',
    name: 'brand',
    align: 'left',
    sortable: true,
  },
  {
    field: 'has_variants',
    label: 'Has Variants',
    name: 'has_variants',
    align: 'center',
    sortable: false,
  }
]
</script>

<style scoped></style>