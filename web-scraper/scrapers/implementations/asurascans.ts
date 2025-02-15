import BaseScraper from "../baseScraper";
import { load } from "cheerio";
import {
  ManganatoChapterList,
  ManganatoInfo,
  ManganatoSearch,
} from "../../types/mangatypes";

class Asurascans extends BaseScraper {
  base = process.env.ASURASCANS_BASE;

  constructor() {
    const website = "Asurascans";
    const base = process.env.ASURASCANS_BASE!;
    super(base);
  }

  async scrapeSearch(title: string) {
    try {
      const url = `${this.base}/series?page=1&name=${encodeURIComponent(
        title
      )}`;
      const pageData = await this.htmlScraper(url);
      return pageData;
    } catch (error) {
      Asurascans.handleError(error, this.throwErrors);
    }
  }
}

async function test() {
  const scraper = new Asurascans();
  const data = await scraper.scrapeSearch("solo leveling");
  console.log(data);
}

test();
