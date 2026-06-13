#!/usr/bin/env node
// Watch mode: rebuilds when content.json or index.html changes
// Serves the compiled dist/ directory

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const CONTENT_JSON = path.join(ROOT, 'content.json');
const INDEX_HTML = path.join(ROOT, 'index.html');

// Import build function
function runBuild() {
  const buildScript = require('./build');
}

// Simple manual build (since build.js runs immediately when required)
function build() {
  const { replaceFromFiles } = require('./replace');

  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  const processedHtml = replaceFromFiles(INDEX_HTML, CONTENT_JSON);
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), processedHtml, 'utf8');

  const publicDir = path.join(ROOT, 'public');
  if (fs.existsSync(publicDir)) {
    const destPublicDir = path.join(DIST_DIR, 'public');
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

  const now = new Date().toLocaleTimeString();
  console.log(`[${now}] Build complete: dist/ updated`);
}

// Initial build
console.log('🔨 Initial build...');
build();

// Start server serving dist/
console.log('🚀 Starting server...');
const server = spawn('node', [path.join(__dirname, 'server.js')], {
  cwd: ROOT,
  env: { ...process.env, SERVE_DIR: DIST_DIR },
  stdio: 'inherit'
});

// Watch files
const filesToWatch = [CONTENT_JSON, INDEX_HTML];
const watchers = new Map();

function setupWatcher(filePath) {
  try {
    const watcher = fs.watch(filePath, (eventType) => {
      if (eventType === 'change') {
        // Debounce: wait 100ms to avoid multiple rapid rebuilds
        clearTimeout(watcher._timeout);
        watcher._timeout = setTimeout(() => {
          const now = new Date().toLocaleTimeString();
          console.log(`\n[${now}] 📝 Detected change: ${path.basename(filePath)}`);
          try {
            build();
          } catch (err) {
            console.error(`[${now}] ❌ Build failed: ${err.message}`);
          }
        }, 100);
      }
    });

    watcher.on('error', (err) => {
      console.error(`Watch error on ${filePath}: ${err.message}`);
    });

    watchers.set(filePath, watcher);
  } catch (err) {
    console.error(`Failed to watch ${filePath}: ${err.message}`);
  }
}

filesToWatch.forEach(setupWatcher);

console.log(`👀 Watching ${filesToWatch.length} files for changes...\n`);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Stopping watch mode...');
  watchers.forEach(watcher => watcher.close());
  server.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  watchers.forEach(watcher => watcher.close());
  server.kill('SIGTERM');
  process.exit(0);
});
