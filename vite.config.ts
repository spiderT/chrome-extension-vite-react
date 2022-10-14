import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './manifest.json',
          dest: '',
        },
        {
          src: './src/assets/logo_128.png',
          dest: '',
        },
        {
          src: './src/script',
          dest: '',
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
  },
});

// TODO 开发模式也可以打包到dist目录
// export default defineConfig(({ command, mode }) => {
//   const copyTargets = [
    
//   ]

//   const config = {
//     plugins: [
//       react(),
//       viteStaticCopy({
//         targets: [
//           {
//             src: './manifest.json',
//             dest: '',
//           },
//           {
//             src: './src/assets/logo_128.png',
//             dest: '',
//           },
//           {
//             src: './src/script',
//             dest: '',
//           },
//         ],
//       }),
//     ],
//     css: {
//       preprocessorOptions: {
//         less: {
//           // 支持内联 JavaScript
//           javascriptEnabled: true,
//         },
//       },
//     },
//   };
//   if (command === 'serve') {
//     return {
//       ...config,
//     };
//   }
//   return {
//     ...config,
//   };
// });
