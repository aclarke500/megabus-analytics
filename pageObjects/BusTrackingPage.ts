import { Page, Locator } from '@playwright/test';

export default class BusTrackingPage {
  public page: Page;
  public earlierCoachesButton: Locator
  public tripCards: Locator;

  constructor(page: Page){
    this.page = page;
    this.earlierCoachesButton = page.locator("//button[normalize-space(text())='EARLIER COACHES']");
    this.tripCards = page.locator('//div[@class="results-service__time"]');
  }

}