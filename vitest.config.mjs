import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@app': path.resolve('./src/app'),
			'@feature': path.resolve('./src/features'),
			'@shared': path.resolve('./src/shared'),
			'@public': path.resolve('./public'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
	},
})