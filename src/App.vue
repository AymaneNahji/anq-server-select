<template>
  <div class="mx-auto container border-2 border-black p-1">
    <AnServerDataTable 
      link="http://localhost:8000/products/client/products/" 
      :columns="cols" 
      :link-params="{
        page_size:1
      }"
      :pagination-response-keys="{
        count:'count',
        lastPage:'last_page',
        next:'next',
        previous:'previous',
        results:'results',
      }"

      title="kkkkk"
      has-search
      :filter-modal-data="fi"
      has-filter
    >
    </AnServerDataTable>

  </div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import AnServerDataTable, { FilterModalData } from './components/AnServerDataTable.vue';



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
  brand: number|null;
  has_variants: boolean;
};

const fi : FilterModalData = {
        fields:[
          {
            label:"Helloo",
            type:'checkboxs',
            urlParam:'aymane',
            choices:[
              {
                label:'Kkkk',
                value:"kkkk"
              },
              {
                label:'Llllll',
                value:"llll"
              },
            ],
            defaultValue:'llll'
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