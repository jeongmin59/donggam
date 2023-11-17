import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  // process에서 타입에러가 뜨게된다.
  // @type/node를 설치해주자
  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            JS_KEY: env.VITE_JS_API_KEY,
          }
        }
      }),
    ],
  }
}
