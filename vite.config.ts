import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

// Copy assets from workspace root to public folder at build/dev startup
try {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.resolve(__dirname, 'public');

  const devCvSrc = path.join(rootDir, 'DEV_CV.pdf');
  const devCvSrc2 = path.join(rootDir, 'Dev.pdf');
  const devCvDst = path.join(publicDir, 'Joydeep_Das_Dev_Resume.pdf');
  if (fs.existsSync(devCvSrc)) {
    fs.copyFileSync(devCvSrc, devCvDst);
    console.log('Copied DEV_CV.pdf to public/Joydeep_Das_Dev_Resume.pdf');
  } else if (fs.existsSync(devCvSrc2)) {
    fs.copyFileSync(devCvSrc2, devCvDst);
    console.log('Copied Dev.pdf to public/Joydeep_Das_Dev_Resume.pdf');
  }

  const uiuxCvSrc = path.join(rootDir, 'UIUX_CV.pdf');
  const uiuxCvSrc2 = path.join(rootDir, 'UIUX_Resume.pdf');
  const uiuxCvDst = path.join(publicDir, 'Joydeep_Das_UIUX_Resume.pdf');
  if (fs.existsSync(uiuxCvSrc)) {
    fs.copyFileSync(uiuxCvSrc, uiuxCvDst);
    console.log('Copied UIUX_CV.pdf to public/Joydeep_Das_UIUX_Resume.pdf');
  } else if (fs.existsSync(uiuxCvSrc2)) {
    fs.copyFileSync(uiuxCvSrc2, uiuxCvDst);
    console.log('Copied UIUX_Resume.pdf to public/Joydeep_Das_UIUX_Resume.pdf');
  }
} catch (err) {
  console.error('Error copying assets:', err);
}


export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
