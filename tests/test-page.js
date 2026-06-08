const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Log console errors
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('🔴 CONSOLE ERROR:', msg.text());
    if (msg.type() === 'warning') console.log('🟡 CONSOLE WARN:', msg.text());
  });
  page.on('pageerror', err => console.log('💥 PAGE ERROR:', err.message));
  
  await page.goto('file:///home/leandro/projects/my-site/index.html', { waitUntil: 'networkidle', timeout: 15000 });
  
  // Check font loading
  const fontsLoaded = await page.evaluate(() => {
    return document.fonts ? 
      Array.from(document.fonts).map(f => `${f.family} (${f.status})`) : 
      'FontFaceSet not available';
  });
  console.log('Fonts:', JSON.stringify(fontsLoaded));
  
  // Check computed styles on key elements
  const styles = await page.evaluate(() => {
    const body = document.querySelector('body');
    const h1 = document.querySelector('h1');
    const nav = document.querySelector('nav');
    if (!body) return { error: 'No body found' };
    const bodyStyles = getComputedStyle(body);
    return {
      bodyBg: bodyStyles.backgroundColor,
      bodyFont: bodyStyles.fontFamily,
      bodyColor: bodyStyles.color,
      h1Exists: !!h1,
      navExists: !!nav,
      navPosition: nav ? getComputedStyle(nav).position : 'N/A',
      tailwindClasses: body.className
    };
  });
  console.log('Computed styles:', JSON.stringify(styles, null, 2));
  
  // Check if tailwind processed
  const twCheck = await page.evaluate(() => {
    const styleTags = document.querySelectorAll('style');
    const twStyles = Array.from(styleTags).filter(s => s.textContent.includes('.bg-background') || s.textContent.includes('--tw'));
    return {
      styleTags: styleTags.length,
      hasTwStyles: twStyles.length > 0,
      twStyleCount: twStyles.length
    };
  });
  console.log('Tailwind check:', JSON.stringify(twCheck));
  
  await browser.close();
})();
