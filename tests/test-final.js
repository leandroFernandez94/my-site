const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('pageerror', err => console.log('ERR:', err.message));
  
  await page.goto('http://127.0.0.1:8769/index.html', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(3000);
  
  const result = await page.evaluate(() => {
    const styles = Array.from(document.querySelectorAll('style'));
    const tw = styles.find(s => s.textContent.includes('--tw-'));
    const text = tw ? tw.textContent : '';
    const body = document.querySelector('body');
    const cs = body ? getComputedStyle(body) : null;
    
    return {
      bodyBg: cs?.backgroundColor,
      bodyFont: cs?.fontFamily?.substring(0, 60),
      bodyColor: cs?.color,
      hasBgBackground: text.includes('.bg-background'),
      hasTextSecondary: text.includes('.text-secondary'),
      hasFontHeadline: text.includes('.font-headline'),
      twCssLength: text.length,
      navExists: !!document.querySelector('nav'),
      navPosition: document.querySelector('nav') ? getComputedStyle(document.querySelector('nav')).position : 'N/A',
      h1FontSize: document.querySelector('h1') ? getComputedStyle(document.querySelector('h1')).fontSize : 'N/A',
    };
  });
  console.log(JSON.stringify(result, null, 2));
  
  await page.screenshot({ path: '/tmp/mysite-final.png', fullPage: false });
  console.log('Screenshot saved');
  
  await browser.close();
})();
