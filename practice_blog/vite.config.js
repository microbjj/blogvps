import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		watch: {
			ignored: ['**/src/db.json'],
		},
		proxy: {
			'/api': {
				target: 'http://localhost:3005',
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'), // 👈 вот он!
		},
	},
})
