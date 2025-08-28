// @ts-check
const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests',
  retries: 1,
  workers: 2,
  /* Run tests in files in parallel */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects : [
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        ignoreHTTPSErrors: false,
        // viewport : {width: 400, height: 600},
        // trace: 'on',
        // screenshot: 'on'
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        ignoreHTTPSErrors: true,
        permissions: ['notifications'],
        ...devices['BlackBerry Z30'],
        // trace: 'on',
        // screenshot: 'on'
      },
    
    } 
  ]
  
});

