// @ts-check
const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  
  reporter: [['line'],['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'firefox',
    headless: true,
    // trace: 'on',
    // screenshot: 'on'
  },

  
});

