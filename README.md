# Vue 管理后台（vue-manager）

这是一个基于 Vue 3 + Vite 的后台管理面板示例项目，项目包含常见的后台功能模块（登录、菜单、用户管理、消息、文件管理、产品管理、日志、设置等），并使用 Element Plus UI 组件库进行界面构建。

后端代码为：https://github.com/Homfay-0903/manager_backend

---
## 主要特性

- 基于 Vue 3（组合式 API）和 Vite 的现代前端构建
- 使用 Element Plus 作为 UI 组件库
- 路由管理：vue-router
- 状态管理：Pinia（含持久化插件）
- 富文本编辑器：WangEditor
- 按需加载 SVG 图标（vite-plugin-svg-icons）
- ECharts 图表集成
- Axios 封装的 HTTP 请求模块

## 技术栈

- 框架：Vue 3
- 构建工具：Vite
- UI：Element Plus
- 状态管理：Pinia + pinia-plugin-persistedstate
- HTTP：Axios
- 样式：Sass（scss）
- 图表：ECharts
- 编辑器：WangEditor

## 项目结构（主要文件和目录）

- `src/` - 源代码目录

  - `main.js` - 应用入口
  - `App.vue` - 根组件
  - `router/` - 路由配置
  - `store/` - Pinia 状态管理
  - `api/` - 后端 API 封装（如登录、消息、文件等）
  - `views/` - 页面视图（按模块划分，如 login、home、menu、product 等）
  - `components/` - 可复用组件
  - `assets/` - 静态资源（样式、svg 等）
  - `utils/` - 工具函数（mitt 等）
  - `http/` - axios 实例与请求封装

- `public/` - 公共静态资源
- `index.html` - Vite 模板

## 快速开始（开发环境）

> 环境：Node.js（建议 >= 16）

1. 安装依赖

```bash
# 在项目根目录执行
npm install
```

2. 启动开发服务器

```bash
npm run dev
```

3. 在浏览器中打开

Vite 启动后会在控制台显示本地访问地址，通常为 `http://localhost:5173`（端口可能不同）。

## 构建与预览（生产环境）

构建生产包：

```bash
npm run build
```

构建后预览：

```bash
npm run preview
```

## 自定义与配置点

- 主题与样式：全局样式位于 `src/assets/css/common.scss`，可在此调整变量与通用样式。
- 路由与权限：路由配置在 `src/router/`，可扩展中间件实现登录鉴权与菜单权限控制。
- 状态持久化：Pinia 的持久化插件配置位于 `src/store/` 文件（查看 `menuStore.js`、`userinfoStore.js` 等示例）。
- API：所有后端交互封装在 `src/api/`，按业务拆分（如 `login.js`, `message.js` 等）。

## 常见问题与提示

- 如果启动时遇到依赖错误，尝试删除 `node_modules` 和 `package-lock.json` 后重新安装：

```bash
rm -rf node_modules package-lock.json; npm install
```

> Windows PowerShell 下删除命令：

```powershell
Remove-Item -Recurse -Force node_modules; Remove-Item -Force package-lock.json; npm install
```

- 如果使用国内镜像加速安装：

```bash
npm install --registry=https://registry.npmmirror.com
```

## 贡献与拓展

此项目适合用于学习、二次开发或作为公司内部后台的原型基础。你可以：

- 替换 API 为真实后端
- 集成权限系统（RBAC）
- 按需拆分路由并实现动态加载


