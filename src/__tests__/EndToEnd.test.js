import puppeteer from 'puppeteer';

// feature 1: filter events by city

describe('Filter events by city.', () => {
  let browser;
  let page;
  let eventListItems;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 50, 
      // timeout: 0 
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
    eventListItems = await page.$$('.event');
  });

  afterAll(async () => {
    await browser.close();
  });

  // scenario 1
  test('When user has not searched for a city, show upcoming events from all cities.', async () => {
    expect(eventListItems.length).toBe(32);
  });

  // scenario 2
  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'Berlin');
    const suggestionListItems = await page.$$('.suggestions li');
    expect(suggestionListItems.length).toBe(2);
  });

  // scenario 3
  test('User can select a city from the suggested list', async () => {
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Backspace');
    }
    await page.type('.city', 'Berlin');
    const suggestionText = await page.$eval('.suggestions li:first-child', el => el.textContent);
    await page.click('.suggestions li:first-child');
    const citySearchInputValue = await page.$eval('.city', el => el.value);
    expect(citySearchInputValue).toBe(suggestionText);
  });
});

// feature 2: show/hide event details

describe('show/hide an event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 50, // slow down by 250 ms
      // timeout: 0 // no timeout limitations
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  // scenario 1
  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });

  // scenario 2
  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-button');
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeDefined();
  });

  // scenario 3
  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-button');
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });
});