const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

(async () => {
  const projectRoot = path.join(__dirname, '..');
  const distIndexPath = path.join(projectRoot, 'dist', 'index.html');
  const localOgPath = path.join(projectRoot, 'public', 'og.png');
  const siblingMainOgPath = path.join(projectRoot, '..', 'my-site', 'public', 'og.png');

  assert(fs.existsSync(distIndexPath), 'dist/index.html not found. Run build first.');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const fileUrl = `file://${distIndexPath}`;
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

  const getMetaContent = async (selector) => page.locator(selector).first().getAttribute('content');

  const ogImage = await getMetaContent('meta[property="og:image"]');
  const ogImageWidth = await getMetaContent('meta[property="og:image:width"]');
  const ogImageHeight = await getMetaContent('meta[property="og:image:height"]');
  const twitterCard = await getMetaContent('meta[name="twitter:card"]');
  const twitterImage = await getMetaContent('meta[name="twitter:image"]');

  assert(ogImage === 'https://leandrofernandez.dev/public/og.png', `Unexpected og:image: ${ogImage}`);
  assert(ogImageWidth === '1200', `Unexpected og:image:width: ${ogImageWidth}`);
  assert(ogImageHeight === '630', `Unexpected og:image:height: ${ogImageHeight}`);
  assert(twitterCard === 'summary_large_image', `Unexpected twitter:card: ${twitterCard}`);
  assert(twitterImage === 'https://leandrofernandez.dev/public/og.png', `Unexpected twitter:image: ${twitterImage}`);

  const remoteUrl = 'https://leandrofernandez.dev/public/og.png';
  try {
    const response = await fetch(remoteUrl);
    assert(response.status === 200, `Expected HTTP 200 for ${remoteUrl}, got ${response.status}`);
  } catch (error) {
    const message = String(error?.message || error);
    const offlineLikely =
      message.includes('ENOTFOUND') ||
      message.includes('EAI_AGAIN') ||
      message.includes('ECONNREFUSED') ||
      message.includes('ETIMEDOUT') ||
      message.includes('fetch failed');

    if (offlineLikely) {
      console.log(`⚠ Remote fetch skipped due to offline/network issue: ${message}`);
      const hasLocalFallback = fs.existsSync(localOgPath) || fs.existsSync(siblingMainOgPath);
      assert(hasLocalFallback, 'Offline mode fallback failed: no local og.png found in worktree or sibling repo.');
    } else {
      throw error;
    }
  }

  console.log('✓ issue-22-og meta and asset checks passed');
  await browser.close();
})();
