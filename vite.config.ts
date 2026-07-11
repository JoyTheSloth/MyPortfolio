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
  const devCvDst = path.join(publicDir, 'Joydeep_Das_Dev_Resume.pdf');
  if (fs.existsSync(devCvSrc)) {
    fs.copyFileSync(devCvSrc, devCvDst);
    console.log('Copied DEV_CV.pdf to public/Joydeep_Das_Dev_Resume.pdf');
  }

  const resumeSrc = path.join(rootDir, 'Resume.pdf');
  const resumeDst = path.join(publicDir, 'Joydeep_Das_Resume.pdf');
  if (fs.existsSync(resumeSrc)) {
    fs.copyFileSync(resumeSrc, resumeDst);
    console.log('Copied Resume.pdf to public/Joydeep_Das_Resume.pdf');
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
