import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize production builds
    sourcemap: false,
    minify: 'esbuild', // Use esbuild for faster builds
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'clsx', 'class-variance-authority'],
          'radix-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-tabs',
          ],
          'game-vendor': ['phaser'],
          'three-vendor': ['three'],
          'query-vendor': ['@tanstack/react-query'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1500, // Increased due to Phaser's size
    // CSS optimization
    cssCodeSplit: true,
    cssMinify: true,
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets < 4kb as base64
  },
  // Optimize dev experience
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  // Remove console in production
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
