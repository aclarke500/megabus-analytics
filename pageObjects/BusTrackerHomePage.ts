import { Locator, Page } from '@playwright/test';

export default class BusTrackerHomePage{
  public page: Page;
  public fromInput: Locator;
  public toInput: Locator;
  public searchButton: Locator;

  constructor(page: Page){
    this.page = page;
    this.fromInput = page.locator('//input[@placeholder="From"]');
    this.toInput = page.locator('//input[@placeholder="To (optional)"]');
    this.searchButton = page.locator('//button[@class="button button--search"]');
  }

  async search(from:string, to:string){
    await this.fromInput.fill(from);
    await this.fromInput.press('Enter');
    await this.toInput.fill(to);
    await this.toInput.press('Enter');
    await wait(1000)
    await this.searchButton.click();
  }
}


function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}