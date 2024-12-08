# AN Quasar Utils for simplify your dev life

`npm i an-quasar-utils` or `yarn add an-quasar-utils`

And use our helper components:

### AnModal

a simple modal with global standars (like stop and disable all buttons when loading initial data)

```
<template>
  <q-page class="row items-center justify-evenly">

    <AnModal ref="modalRef" title="Title of modal">
      <template #content>
        Hello guys i am the main content of modal !!
      </template>
      <template #ok-btn="scope">
        <!--
        scope: {
            click: () => void;
            color: NamedColor | undefined;
            label: string;
        }
        -->
        <q-btn outline color="red" @click="scope.click"> Do anything </q-btn>
      </template>
      <template #cancel-btn="scope">
        <!--
        scope: {
            color: NamedColor | undefined;
            disable: boolean;
            label: string;
        }
        -->
      </template>
      <template #close-icon-btn="scope">
        <!--
        scope: {
            color: NamedColor | undefined;
            disable: boolean;
        }
        -->
      </template>

    </AnModal>

    <q-btn label="open modal" color="primary" @click="modalRef?.show()" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {AnModal} from 'an-quasar-utils'

const modalRef = ref<InstanceType<typeof AnModal>>()


</script>

```

### AnModalForm

is the same of AnModal just with support form behavior like form-is-loading and @submit

```
<template>
  <q-page class="row items-center justify-evenly">

    <AnModalForm ref="modalFormRef" @submit="onSubmit" :form-is-loading="data.formIsSubmitting">
      <template #content>
        <q-input label="Name" v-model="data.form.name" outlined :rules="[(val:string)=>val.trim() ? true : 'This field is required']" />
      </template>
    </AnModalForm>

    <q-btn label="open modal form" color="primary" @click="modalFormRef?.show()" />
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { AnModalForm} from 'an-quasar-utils'

const modalFormRef = ref<InstanceType<typeof AnModalForm>>()

const onSubmit = ()=>{
  data.formIsSubmitting = true
  Promise.resolve().then(()=>{
    console.log('operation work succssfuly.');
  }).catch(()=>{
    console.log('there is a problem.');
  }).finally(()=>{
    data.formIsSubmitting = true
  })
}

const data = reactive({
  form:{
    name:''
  },
  formIsSubmitting:false,
})

</script>
```

### AnPhoneNumberInput

A reactive international phone number input force the user to add a real phone numbers with full props/slots access to internal components

```
<template>
<AnPhoneNumberInput v-model="data.phone" class="gap-3" outlined :country-props="{outlined:true,dense:true,excludeCountries:['US']}" dense >
  <template #country-select-prepend>
    <q-icon name="flag" />
  </template>
</AnPhoneNumberInput>
</template>

<script>
import { reactive } from 'vue';
import { AnPhoneNumberInput } from 'an-quasar-utils'

const data = reactive({
  phone:'+21235980022'
})

</script>
```

### AnServerSelect

An QSelect with live search for simplify server data selection

```
<template>

<AnServerSelect link="https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag" v-model="data.country" :option-label="op=>op.name.common" option-value="cca2" emit-value map-options  />
      {{data.countryCode}}

</template>

<script>
import { reactive } from 'vue';
import { AnServerSelect } from 'an-quasar-utils'

const data = reactive({
  countryCode:null as string | null
})

</script>
```

### AnServerDataTable

A customizable QTable with live search and intelligent filter modal (using just with a server paginated data)

```
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
      :filter-modal-data="filterModalData"
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

const filterModalData : FilterModalData = {
        fields:[
          {
            label:"Popular domain",
            type:'checkboxs',
            urlParam:'products_domain',
            choices:[
              {
                label:'Skinecare',
                value:"skinecare"
              },
              {
                label:'Gaming',
                value:"gaming"
              },
            ],
            defaultValue:'gaming'
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
```

# Big Note : use TypeScript for descover our utils because there is a lot of props/slots/exposes we can't document them
