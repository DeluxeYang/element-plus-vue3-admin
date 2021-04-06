import { defineConfig, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { svgBuilder } from '/@/components/SvgIcon/svgBuilder'

export default (mode: string): UserConfigExport => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    // assetsInclude: 'public',
    server: {
      proxy: {
        [<string>process.env.VITE_APP_API_BASE_URL]: {
          target: process.env.VITE_APP_BACKEND_HOST,
          changeOrigin: true
        }
      },
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:3001/',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // },
      port: 7357
    },
    build: {
      sourcemap: true
      // cssCodeSplit: true
    },
    optimizeDeps: {
      include: ['axios', 'nprogress']
    },
    plugins: [vue(), svgBuilder('./src/icons/svg/')],
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

