const fs = require('fs');
const path = require('path');

// Simple build script for Cloudflare Pages
// Copies static files to dist/ directory

const distDir = path.join(__dirname, '..', 'dist');
const publicDir = path.join(__dirname, '..', 'public');
const indexHtml = path.join(__dirname, '..', 'index.html');

// Create dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy index.html
fs.copyFileSync(indexHtml, path.join(distDir, 'index.html'));

// Copy public directory
if (fs.existsSync(publicDir)) {
  const destPublicDir = path.join(distDir, 'public');
  if (!fs.existsSync(destPublicDir)) {
    fs.mkdirSync(destPublicDir, { recursive: true });
  }

  const files = fs.readdirSync(publicDir);
  for (const file of files) {
    const srcPath = path.join(publicDir, file);
    const destPath = path.join(destPublicDir, file);
    fs.copyFileSync(srcPath, destPath);
  }
}

console.log('Build complete: dist/ directory created');
