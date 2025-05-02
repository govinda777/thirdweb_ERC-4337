import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Browser, Page, chromium } from 'puppeteer';

let browser: Browser;
let page: Page;

Given('I am on the home page', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
});

When('I click the {string} button', async function (buttonText: string) {
    await page.click(`button:has-text("${buttonText}")`);
});

Then('I should see the wallet connection modal', async function () {
    const modal = await page.waitForSelector('.wallet-modal');
    expect(modal).to.exist;
});

Then('I should be able to select my preferred wallet provider', async function () {
    const providers = await page.$$('.wallet-provider');
    expect(providers.length).to.be.greaterThan(0);
});

Given('I am connected to my smart wallet', async function () {
    // Implementation for checking wallet connection
    const isConnected = await page.evaluate(() => {
        return window.ethereum?.isConnected();
    });
    expect(isConnected).to.be.true;
});

When('I navigate to the dashboard', async function () {
    await page.click('a[href="/dashboard"]');
});

Then('I should see my current balance', async function () {
    const balanceElement = await page.waitForSelector('.balance');
    expect(balanceElement).to.exist;
});

Then('I should see my recent transactions', async function () {
    const transactions = await page.$$('.transaction-item');
    expect(transactions.length).to.be.greaterThan(0);
});

Given('I have sufficient balance', async function () {
    const balance = await page.evaluate(() => {
        return document.querySelector('.balance')?.textContent;
    });
    expect(parseFloat(balance || '0')).to.be.greaterThan(0);
});

When('I enter a valid recipient address', async function () {
    await page.type('.recipient-address', '0x1234567890123456789012345678901234567890');
});

When('I specify the amount to send', async function () {
    await page.type('.amount-input', '0.1');
});

When('I confirm the transaction', async function () {
    await page.click('.confirm-transaction');
});

Then('the transaction should be processed successfully', async function () {
    const successMessage = await page.waitForSelector('.transaction-success');
    expect(successMessage).to.exist;
});

Then('I should see a confirmation message', async function () {
    const confirmation = await page.waitForSelector('.confirmation-message');
    expect(confirmation).to.exist;
}); 