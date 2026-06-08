const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  
  page.on('pageerror', err => console.log('ERR:', err.message));
  
  await page.goto('file:///home/leandro/projects/my-site/index.html', { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(2000);
  
  // Check what bg-background resolves to
  const bgCheck = await page.evaluate(() => {
    const body = document.querySelector('body');
    const cs = getComputedStyle(body);
    
    // Check if bg-background class is present
    const hasBgClass = body.classList.contains('bg-background');
    
    // Find the Tailwind-generated CSS rule for bg-background
    const styles = Array.from(document.querySelectorAll('style'));
    let bgBackgroundRule = null;
    for (const s of styles) {
      const text = s.textContent;
      const match = text.match(/\.bg-background\s*\{[^}]*\}/);
      if (match) { bgBackgroundRule = match[0]; break; }
    }
    
    return {
      backgroundColor: cs.backgroundColor,
      hasBgClass,
      bgBackgroundRule,
      navBg: getComputedStyle(document.querySelector('nav')).backgroundColor,
      h1Color: getComputedStyle(document.querySelector('h1')).color,
    };
  });
  console.log(JSON.stringify(bgCheck, null, 2));
  
  await page.screenshot({ path: '/tmp/mysite-screenshot.png', fullPage: false });
  console.log('Screenshot saved to /tmp/mysite-screenshot.png');
  
  await browser.close();
})();
