import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import process from 'node:process';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load environment variables from .env.local
    dotenv.config({ path: './.env.local' });
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            react(),
            VitePWA({
                registerType: 'autoUpdate',
                injectRegister: false,
                pwaAssets: {
                    disabled: false,
                    config: true,
                },
                manifest: {
                    name: 'Stream Of Wisdom Bible',
                    short_name: 'Stream Of Wisdom Bible',
                    description: 'Bible App For The True Israelites.',
                    theme_color: '#50C878',
                },
                workbox: {
                    globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
                    cleanupOutdatedCaches: true,
                    clientsClaim: true,
                    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // Example: set the limit to 10 MB (adjust as needed)
                },
                devOptions: {
                    enabled: false,
                    navigateFallback: 'index.html',
                    suppressWarnings: true,
                    type: 'module',
                },
            }),
        ],
        server: {
            proxy: {
                '/api': {
                    target: 'https://api.elevenlabs.io',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                    configure: (proxy) => {
                        proxy.on('proxyReq', (proxyReq) => {
                            proxyReq.setHeader('xi-api-key', env.ELEVENLABS_API_KEY);
                        });
                    },
                },
            },
        },
        build: {
            chunkSizeWarningLimit: 8000, // We discussed this earlier
        },
    };
});