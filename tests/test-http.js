const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('pageerror', err => console.log('PAGE ERR:', err.message));
  
  await page.goto('http://127.0.0.1:5173/index.html', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(3000);
  
  const result = await page.evaluate(() => {
    const styles = Array.from(document.querySelectorAll('style'));
    const largest = styles.reduce((a, b) => a.textContent.length > b.textContent.length ? a : b, styles[0]);
    const body = document.querySelector('body');
    const cs = body ? getComputedStyle(body) : null;
    
    return {
      totalStyleTags: styles.length,
      largestLength: largest?.textContent.length || 0,
      largestPreview: largest?.textContent.substring(0, 400),
      bodyBg: cs?.backgroundColor,
      bodyFont: cs?.fontFamily?.substring(0, 60),
    };
  });
  console.log(JSON.stringify(result, null, 2));
  
  await browser.close();
})();
