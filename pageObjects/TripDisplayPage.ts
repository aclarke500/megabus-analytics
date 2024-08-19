import { Locator, Page } from '@playwright/test';
import { timeDifferenceInMinutes, stripToNumbersAndPM } from '../utilites/functions';

export default class TripDisplay {
  public page: Page;
  public tripNodes: Locator;
  public seeNextStopsButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.tripNodes = page.locator('//table//tbody//tr'); // basically a list
    this.seeNextStopsButton = page.locator("//button[normalize-space(text())='See next stops']");
  }
  async getDelayToDestination(destination: string): Promise<number> {
    // find the node with the destination in it
    // he hides in the third td tag within the tr, in the first span in there
    const numberOfNodes: number = await this.tripNodes.count();
    let locations: string[] = []
    let index: number = -1;

    for (let i = 0; i < numberOfNodes; i++) {
      const node: Locator = this.tripNodes.nth(i);
      const location: string = await node.locator('//td').nth(2).locator('//span[1]').innerText();
      console.log(location)
      locations.push(location);
      if (location.includes(destination)) {
        index = i;
        break;
      }
    }
    if (index == -1) throw Error(`Unable to find ${destination} in ${locations}`);
    // 
    const node: Locator = this.tripNodes.nth(index);
    const timeArrival: string = await node.locator('//td//span[contains(@class, "arrive")]').innerText();
    console.log(timeArrival)
    const timeDepartureNode: Locator = await node.locator('//td//span[contains(@class, "stop-time--red")]');
    if (!timeDepartureNode.count()) return 0; // if no red guy, not delayed
    const timeDeparted: string = await timeDepartureNode.innerText();
    console.log(timeDeparted)
    const time1: string = stripToNumbersAndPM(timeArrival);
    const time2: string = stripToNumbersAndPM(timeDeparted);
    console.log(time1, time2, 'plug')
    return timeDifferenceInMinutes(time1, time2);
  }
}