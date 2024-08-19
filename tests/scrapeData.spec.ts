import { test, Locator } from '@playwright/test';
import BusTrackerHomePage from '../pageObjects/BusTrackerHomePage';
import BusTrackingPage from '../pageObjects/BusTrackingPage';
import TripDisplay from '../pageObjects/TripDisplayPage';

test('Toronto to Kingston Data', async({page})=>{
  test.setTimeout(60000);
  // await page.goto('https://bustracker.megabus.com/');
  // const homePage: BusTrackerHomePage = new BusTrackerHomePage(page);
  await page.goto('https://bustracker.megabus.com/view/between/683/195');
  const tripList: BusTrackingPage = new BusTrackingPage(page);
  const tripDisplay: TripDisplay = new TripDisplay(page);
  // await homePage.search('Toronto, ON: Union Stn Bus Terminal, 81 Bay St at Lakeshore Blvd, 2nd Floor', 'Kingston, ON: Kingston Bus Terminal');
  await tripList.earlierCoachesButton.click();
  const numberOfTrips: number = await tripList.tripCards.count();

  for (let i = 0; i < numberOfTrips; i++){
    const tripCard: Locator = tripList.tripCards.nth(i);
    const openButton: Locator = page.locator('//div[@class="results-service__tracking"]//span').nth(i);
    await openButton.click();
    await wait(3000);
    if(await tripDisplay.seeNextStopsButton.isVisible()) await tripDisplay.seeNextStopsButton.click();
    
    await wait(200)
    const numberOfStops: number = await tripDisplay.tripNodes.count();
    console.log(numberOfStops);
    const delay: Number = await tripDisplay.getDelayToDestination('Kingston');
    console.log(delay);
    await wait(500);
  }
})

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}