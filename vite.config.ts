import { defineConfig } from 'vite';
// @ts-expect-error no types
import react from '@vitejs/plugin-react';

// https://techblog.skeepers.io/create-a-web-component-from-a-react-component-bbe7c5f85ee6
export default defineConfig({
    define: {
        'process.env': {
            NODE_ENV: 'production',
        },
    },
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        port: 3000,
        proxy: {
            '/files': 'http://127.0.0.1:8081',
            '/adapter': 'http://127.0.0.1:8081',
            '/session': 'http://127.0.0.1:8081',
            '/log': 'http://127.0.0.1:8081',
            '/lib/js/crypto-js': 'http://127.0.0.1:8081',
            '/sso': 'http://127.0.0.1:8081',
            '/files/': 'http://127.0.0.1:8081',
        },
    },
    // 👇 Insert these lines
    build: {
        lib: {
            entry: './src/index.tsx',
            name: 'iobrokerFile',
            fileName: format => `iobrokerFile.${format}.js`,
        },
        target: 'esnext',
    },
});
