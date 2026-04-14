import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  /**
   * Dev server: use `npm run dev` or double-click `start-dev.bat`.
   * Binding to 127.0.0.1 avoids some Windows firewall prompts (unlike 0.0.0.0).
   */
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
    /** Opens default browser to the app (needs the server running — do not Ctrl+C). */
    open: 'http://127.0.0.1:5173/',
    /** Avoids clearing the terminal so the printed URL stays readable on Windows. */
    clearScreen: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  },

  preview: {
    host: '127.0.0.1',
    port: 4173,
    open: 'http://127.0.0.1:4173/',
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Keep 3D tooling split so it doesn't become one massive chunk.
            // These are loaded on-demand via React.lazy/Suspense in the app.
            if (id.includes('@splinetool')) {
              return 'vendor-spline'
            }
            if (
              id.includes('three') ||
              id.includes('@react-three') ||
              id.includes('meshline') ||
              id.includes('draco') ||
              id.includes('ktx2') ||
              id.includes('basisu') ||
              id.includes('physics') ||
              id.includes('navmesh')
            ) {
              return 'vendor-three'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
