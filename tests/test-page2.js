const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('pageerror', err => console.log('💥 PAGE ERROR:', err.message));
  
  await page.goto('file:///home/leandro/projects/my-site/index.html', { waitUntil: 'load', timeout: 15000 });
  
  // Wait for Tailwind to process
  await page.waitForTimeout(3000);
  
  // Check if tailwind object exists and what's in it
  const twObj = await page.evaluate(() => {
    const tw = window.tailwind;
    return tw ? { hasConfig: !!tw.config, version: tw.version || 'unknown' } : 'tailwind global not found';
  });
  console.log('Tailwind global:', JSON.stringify(twObj));
  
  // Check computed styles after waiting
  const styles = await page.evaluate(() => {
    const body = document.querySelector('body');
    if (!body) return { error: 'No body' };
    const cs = getComputedStyle(body);
    return {
      bg: cs.backgroundColor,
      font: cs.fontFamily,
      color: cs.color,
    };
  });
  console.log('Body styles:', JSON.stringify(styles));
  
  // Check for generated style tags
  const twCheck = await page.evaluate(() => {
    const allStyles = Array.from(document.querySelectorAll('style'));
    const generated = allStyles.filter(s => s.textContent.length > 500);
    return {
      totalStyleTags: allStyles.length,
      generatedCount: generated.length,
      firstGeneratedPreview: generated[0] ? generated[0].textContent.substring(0, 200) : 'none'
    };
  });
  console.log('Style tags:', JSON.stringify(twCheck, null, 2));
  
  await browser.close();
})();
