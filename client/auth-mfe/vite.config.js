import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3001,
    },
    plugins: [
        react(),
        federation({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/App.jsx',
            },
            shared: ['react', 'react-dom', '@apollo/client', 'graphql'],
        }),
    ],
    build: {
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
    },
})
