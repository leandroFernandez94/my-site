const fs = require('fs');
const path = require('path');
const { replaceFromFiles } = require('./replace');

// Simple build script for Cloudflare Pages
// Copies static files to dist/ directory

const distDir = path.join(__dirname, '..', 'dist');
const publicDir = path.join(__dirname, '..', 'public');
const indexHtml = path.join(__dirname, '..', 'index.html');
const contentJson = path.join(__dirname, '..', 'content.json');

// Create dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Process template index.html with content.json
const processedHtml = replaceFromFiles(indexHtml, contentJson);
fs.writeFileSync(path.join(distDir, 'index.html'), processedHtml, 'utf8');

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
