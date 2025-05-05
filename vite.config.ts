import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      // sassVariables: 'src/quasar-variables.sass',
    }),
    cssInjectedByJsPlugin()
  ],
  build:{
    lib:{
      entry:"./src/index.ts",
      name:"anqServerSelect",
      fileName:'anq-server-select',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
      
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
