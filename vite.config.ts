import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    //...
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
    Components({ // 重新配置 Components
      resolvers: [
        ElementPlusResolver({ // 实现按需加载并自定义主题
          importStyle: "sass",
        }),
      ],
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables.scss" as globalScss;
          @use "./src/styles/element-variables.scss" as *;
        ` // 引入自定义主题文件和全局的scss变量文件  => 必须使用@use
      }
    }
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')    // 配置别名；将 @ 指向'src'目录
    }
  },

  server: {
    proxy: {
      '/api': 'http://localhost:3000', // 代理 API 请求
    },
    // port: 3000,       // 设置服务启动的端口号；如果端口已经被使用，Vite 会自动尝试下一个可用的端口
    // open: true,       // 服务启动后自动打开浏览器
    // proxy: {          // 代理
    //   '/api': {
    //     target: '真实接口服务地址',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')     // 注意代理地址的重写
    //   },
    //   // 可配置多个... 
    // }
  },
})
