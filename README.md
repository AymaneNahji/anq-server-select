# AN Quasar Server Select

A powerful, customizable server select component for Quasar Framework and Vue 3 applications. This component provides a seamless way to implement server selection functionality with validation and integration with Quasar's design system.

## Features

- 🎨 Seamless integration with Quasar Framework
- 🔍 Server selection with validation
- 📱 Responsive design
- 🎯 TypeScript support
- 🎭 Customizable styling
- 🌐 Internationalization support
- 📦 Easy to install and use

## Installation

```bash
npm install anq-quasar-server-select
# or
yarn add anq-quasar-server-select
```

## Requirements

- Vue 3.x
- Quasar Framework 2.x
- Node.js >= 14.0.0

## Usage

```vue
<template>
  <anq-server-select
    v-model="selectedServer"
    :servers="servers"
    @update:model-value="handleServerChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AnqServerSelect } from 'anq-server-select'

const selectedServer = ref(null)
const servers = ref([
  { id: 1, name: 'Server 1', url: 'https://server1.example.com' },
  { id: 2, name: 'Server 2', url: 'https://server2.example.com' }
])

const handleServerChange = (server) => {
  console.log('Selected server:', server)
}
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `any` | `null` | The selected server value |
| servers | `Array` | `[]` | Array of server objects |
| label | `string` | `'Server'` | Label for the select input |
| placeholder | `string` | `'Select a server'` | Placeholder text |
| required | `boolean` | `false` | Whether the field is required |
| disabled | `boolean` | `false` | Whether the field is disabled |

## Events

| Event | Parameters | Description |
|-------|------------|-------------|
| update:model-value | `(value: any)` | Emitted when the selected value changes |
| validation | `(isValid: boolean)` | Emitted when validation state changes |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- Aymane Nahji ([GitHub](https://github.com/AymaneNahji))

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/AymaneNahji/anq-server-select/issues) on GitHub. 