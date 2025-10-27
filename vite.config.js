import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
	resolve
} from 'path'
const pathResolve = dir => resolve(__dirname, dir)
import {
	createSvgIconsPlugin
} from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(),
		createSvgIconsPlugin({
			iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
			symbolId: 'icon-[dir]-[name]',
		}),
	],
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: []
		}
	},
	server: {
		port: 8080,
		open: true,
		cors: true,
	},
	resolve: {
		alias: {
			'@': pathResolve('./src')
		}
	}
})