import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
// import { visitEachChild } from "typescript";


import { existsSync, readFileSync } from 'fs'

/** 解析后环境变量 */
const config = getEnvConfig()
console.log(config)

/** 读取环境变量文件 */
function getEnvConfig() {
  const path = existsSync('.env.local') ? '.env.local' : 'env'
  if (!existsSync(path)) {
    return {}
  } else {
    const content = readFileSync(path, 'utf-8')
    return parse(content)
  }
}

/** 解析环境变量内容 */
function parse(string) {
  const obj = {}
  const regExp = '(\\S+)\\s*=\\s*[\'|\"]?(\\S+)[\'|\"]?'
  const list = string.match(new RegExp(regExp, 'g'))
  list &&
    list.forEach((item) => {
      const data = item.match(new RegExp(regExp))
      const key = data ? data[1].trim() : undefined
      const value = data ? data[2].trim() : undefined
      key && (obj[key] = value)
    })
  return obj
}


export default defineConfig({
  base: "/",
  // server: {
  //   port: 3073,
  // },
  plugins: [
    reactRefresh(),
  ],
  resolve: {
    alias: [
      { find: /^~/, replacement: '' }
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        modifyVars: {
          "font-family": "'latin', 'hans'",
        }
      }
    }

  },
  define: {
  }
})