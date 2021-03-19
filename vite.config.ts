import { defineConfig, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import postcss from 'postcss'
import atImport from 'postcss-import'

export default (mode: string): UserConfigExport => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  console.log('vite.config.ts')
  // process css
  postcss([require('postcss-easy-import')])
    .use(atImport({
      path: [path.resolve(__dirname, '/src')]
    // resolve(id, basedir, importOptions) {
    //   console.log(id, basedir, importOptions)
    // }
    // resolve: {
    //   alias: {
    //     '/@': path.resolve(__dirname, 'src')
    //   }
    // }
    }))


  return defineConfig({
    // assetsInclude: 'public',
    server: {
      proxy: {
        [<string>process.env.VITE_APP_API_BASE_URL]: {
          target: process.env.VITE_APP_BACKEND_HOST,
          changeOrigin: true
        }
      },
      port: 7357
    },
    build: {
      sourcemap: true
      // cssCodeSplit: true
    },
    optimizeDeps: {
      include: ['axios', 'nprogress']
    },
    plugins: [vue()],
    css: {
      postcss: {
        plugins: [
          require('autoprefixer'),
          require('tailwindcss'),
          require('postcss-nested'),
          require('postcss-simple-vars'),
          require('postcss-import')
        ]
      }
    },
    resolve: {
      alias: {
        '/@': path.resolve(__dirname, 'src')
      }
    }
  })
}

