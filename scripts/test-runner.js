#!/usr/bin/env node
// Corre todos los tests de Playwright en tests/ secuencialmente

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const testsDir = path.join(__dirname, '..', 'tests');
const files = fs.readdirSync(testsDir)
  .filter(f => f.endsWith('.js'))
  .sort();

if (files.length === 0) {
  console.log('No test files found in tests/');
  process.exit(0);
}

console.log(`Found ${files.length} test file(s)\n`);

let failed = 0;
for (const file of files) {
  const filePath = path.join(testsDir, file);
  console.log(`▶ ${file}`);
  try {
    execSync(`node "${filePath}"`, {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
    });
    console.log('');
  } catch {
    console.error(`  ✗ FAILED\n`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`${failed} test(s) failed`);
  process.exit(1);
}

console.log('✓ All tests passed');
