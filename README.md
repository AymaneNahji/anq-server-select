# AnqServerSelect

A Vue 3 component for server-side select/dropdown with filtering capabilities.

## Installation

```bash
npm install anq-server-select
```

## Usage

```vue
<template>
  <AnqServerSelect
    v-model="selectedValue"
    label="Select Country"
    link="https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag"
    :defaultOptions="[]"
    @filter="onFilter"
    @loading="onLoading"
    @error="onError"
    :option-label="(opt) => opt.name.common"
  >
    <!-- Optional custom option template -->
    <template #option="{ opt }">
      <div class="flex items-center gap-2">
        <span>{{ opt.flag }}</span>
        <span>{{ opt.name }}</span>
      </div>
    </template>
  </AnqServerSelect>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AnqServerSelect from 'anq-server-select';

const selectedValue = ref(null);

const onFilter = (value: string) => {
  console.log('Filtering with:', value);
};

const onLoading = (isLoading: boolean) => {
  console.log('Loading:', isLoading);
};

const onError = (error: unknown) => {
  console.error('Error:', error);
};
</script>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| v-model | any | Yes | The selected value |
| label | string | Yes | Label for the select input |
| link | string | Yes | API endpoint URL to fetch options |
| defaultOptions | array | No | Initial options array |
| option-label | function | Yes | Function to determine the label for each option |

## Events

| Event | Parameters | Description |
|-------|------------|-------------|
| filter | (value: string) | Emitted when filtering is triggered |
| loading | (isLoading: boolean) | Emitted when loading state changes |
| error | (error: unknown) | Emitted when an error occurs |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| option | { opt } | Custom template for rendering each option |

## Example

The component is demonstrated with a country selector that uses the REST Countries API. It shows how to:
- Fetch data from an API endpoint
- Handle loading states
- Implement filtering
- Customize option rendering
- Handle errors

## License

MIT 