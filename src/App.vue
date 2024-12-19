<template>
  <q-form @submit="onSubmit" class="mx-auto container border-2">
    <q-card class="p-5 flex flex-col gap-5">
      <AnServerSelect link="https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag" multiple :rules="[val=>!!val || 'hello']" v-model="data.country" :option-label="op=>op.name.common" option-value="cca2" emit-value map-options  />
      {{data.country}}
      <q-btn label="Submit" type="submit" color="primary" />
    </q-card>
  </q-form>

  <AnServerDataTable has-filter  title="modelName" :filter-modal-data="{
    fields:[
      {
        label:'title',
        type:'select',
        urlParam:'title',
        choices:[
          {
            label:'ddddddd',
            value:'555'
          }
        ]
      }
    ]
  }" has-search :columns="cols"
      :link="`http://localhost:8000/models/book/`" >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="more_vert" unelevated round>
            <q-menu>
              <q-list>
                <q-item clickable class="flex justify-center items-center gap-1 text-blue-600" >
                  <q-icon name="edit" size="1.5rem" />
                  <span>Update</span>
                </q-item>
                <q-item clickable class="flex justify-center items-center gap-1 text-red-600" >
                  <q-icon name="delete" size="1.5rem" />
                  <span>Delete</span>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>
    </AnServerDataTable>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import  AnServerDataTable, { FilterModalData } from './components/AnServerDataTable.vue';
import AnServerSelect from './components/AnServerSelect.vue';
import { reactive } from 'vue';


const data = reactive({
  country: []
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

const cols: QTableColumn[] = [
  {
    field: 'id',
    label: 'ID',
    name: 'id',
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
]
</script>

<style scoped></style>