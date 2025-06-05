import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			api: './src/services',
			components: './src/components',
			lib: './src/lib',
			stores: './src/stores',
			types: './types',
			utils: './src/utils',
			static: './static'
		},
		adapter: adapter()
	}
};

export default config;
