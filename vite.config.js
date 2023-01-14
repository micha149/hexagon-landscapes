import glslify from 'rollup-plugin-glslify';
import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    glslify(),
    svgr({
      namedExport: 'Image',
      svgoConfig: {
        plugins: [
          { removeDimensions: true },
          { removeViewBox: false },
          { cleanupNumericValues: { floatPrecision: 0 } },
          { convertPathData: { floatPrecision: 0 } }
        ]
      }
    }),
    react(),
  ],
  build: {
      sourcemap: true,
  }
})
