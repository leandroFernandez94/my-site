const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://127.0.0.1:8768/index.html', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(3000);
  
  const result = await page.evaluate(() => {
    const styles = Array.from(document.querySelectorAll('style'));
    const tw = styles.find(s => s.textContent.includes('--tw-'));
    const text = tw ? tw.textContent : '';
    
    // Look for our custom color classes
    const hasBgBackground = text.includes('.bg-background');
    const hasTextSecondary = text.includes('.text-secondary');
    const hasFontHeadline = text.includes('.font-headline');
    const hasFontBody = text.includes('.font-body');
    
    // Search for any bg- class that uses our colors
    const bgMatches = text.match(/\.bg-\S+\{/g) || [];
    const ourBgMatches = bgMatches.filter(m => 
      m.includes('bg-background') || m.includes('bg-surface') || m.includes('bg-primary') || m.includes('bg-secondary')
    );
    
    return {
      hasBgBackground, hasTextSecondary, hasFontHeadline, hasFontBody,
      allBgClasses: bgMatches.slice(0, 20),
      ourBgClasses: ourBgMatches,
      cssSample: text.substring(text.indexOf('.bg-'), text.indexOf('.bg-') + 200),
      twLength: text.length
    };
  });
  console.log(JSON.stringify(result, null, 2));
  
  await browser.close();
})();
