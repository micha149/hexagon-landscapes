import glslify from 'rollup-plugin-glslify';
import svgr from '@svgr/rollup';
import reactRefresh from '@vitejs/plugin-react-refresh';
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
    reactRefresh(),
  ],
  build: {
      sourcemap: true,
  }
})
