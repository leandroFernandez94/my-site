const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('file:///home/leandro/projects/my-site/index.html', { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(2000);
  
  const css = await page.evaluate(() => {
    const styles = Array.from(document.querySelectorAll('style'));
    const tw = styles.find(s => s.textContent.length > 1000);
    if (!tw) return 'No Tailwind-generated styles found';
    
    const text = tw.textContent;
    // Search for our custom classes
    const customClasses = [];
    const patterns = ['bg-background', 'bg-surface', 'text-on-surface', 'text-secondary', 
                      'font-headline', 'font-body', 'font-label', 'mb-section-gap',
                      'text-on-surface-variant', 'bg-surface-container-low', 'border-outline-variant'];
    for (const p of patterns) {
      if (text.includes(p)) customClasses.push('✅ ' + p);
      else customClasses.push('❌ ' + p);
    }
    
    return {
      totalLength: text.length,
      customClasses,
      sampleStart: text.substring(0, 500),
    };
  });
  console.log(JSON.stringify(css, null, 2));
  
  await browser.close();
})();
