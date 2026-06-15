const { test, expect } = require('playwright/test');

const pageUrl = 'file:///home/leandro/projects/my-site-issue-23/index.html';

async function getCardStyles(page) {
  return page.locator('.experience-card').first().evaluate((element) => {
    const computed = window.getComputedStyle(element);
    const toNumber = (value) => Number.parseFloat(value || '0') || 0;

    return {
      borderTopWidth: toNumber(computed.borderTopWidth),
      borderRadius: toNumber(computed.borderTopLeftRadius),
      boxShadow: computed.boxShadow,
      paddingTop: toNumber(computed.paddingTop),
    };
  });
}

test.beforeEach(async ({ page }) => {
  await page.goto(pageUrl, { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  await expect(page.locator('.experience-card').first()).toBeVisible();
});

test('Experience card renders with chrome on desktop (>=768px)', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });

  const styles = await getCardStyles(page);

  expect(styles.borderTopWidth).toBeGreaterThan(0);
  expect(styles.borderRadius).toBeGreaterThan(0);
  expect(styles.boxShadow).not.toBe('none');
  expect(styles.paddingTop).toBeGreaterThan(0);
});

test('Experience card flattens on mobile (<768px)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });

  const styles = await getCardStyles(page);

  expect(styles.borderTopWidth).toBe(0);
  expect(styles.borderRadius).toBe(0);
  expect(styles.boxShadow).toBe('none');
  expect(styles.paddingTop).toBe(0);
});

test('Card chrome returns at breakpoint boundary after resize to 768px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const mobileStyles = await getCardStyles(page);

  expect(mobileStyles.borderTopWidth).toBe(0);
  expect(mobileStyles.borderRadius).toBe(0);
  expect(mobileStyles.boxShadow).toBe('none');
  expect(mobileStyles.paddingTop).toBe(0);

  await page.setViewportSize({ width: 768, height: 900 });
  const desktopStyles = await getCardStyles(page);

  expect(desktopStyles.borderTopWidth).toBeGreaterThan(0);
  expect(desktopStyles.borderRadius).toBeGreaterThan(0);
  expect(desktopStyles.boxShadow).not.toBe('none');
  expect(desktopStyles.paddingTop).toBeGreaterThan(0);
});
