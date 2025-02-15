import BaseScraper from "../baseScraper";
import { load } from "cheerio";
import {
  ManganatoChapterList,
  ManganatoInfo,
  ManganatoSearch,
} from "../../types/mangatypes";

class Manganato extends BaseScraper {
  base = process.env.MANGANATO_BASE;
  base_info = "https://chapmanganato.to";

  constructor() {
    const website = "Manganato";
    const base = process.env.MANGANATO_BASE!;
    super(base);
  }

  async scrapeSearch(title: string) {
    try {
      const pageData = await this.htmlScraper(
        `${this.base}/search/story/${title.toLowerCase().replaceAll(" ", "_")}`
      );
      const $ = load(pageData.data);

      const searchData: ManganatoSearch[] = [];
      $("div.search-story-item").each((_, el) => {
        const title = $(el).find("div.item-right > h3").text().trim();
        const image = $(el).find("img").attr("src");
        const id = $(el).find("a").attr("href")!.split("/")[3];

        searchData.push({ id, title, image });
      });

      return searchData;
    } catch (error) {
      Manganato.handleError(error, this.throwErrors);
    }
  }

  async scrapeInfo(id: string) {
    try {
      const pageData = await this.htmlScraper(`${this.base_info}/${id}`);
      const $ = load(pageData.data);

      const mangaInfo: ManganatoInfo = {};

      const infoBox = $("div.story-info-right");
      mangaInfo.title = infoBox.find("h1").text();

      infoBox.find("table.variations-tableInfo > tbody > tr").each((_, el) => {
        const key = $(el).find("i").attr("class");
        switch (key) {
          case "info-alternative":
            mangaInfo.alternate_names = $(el).find("td > h2").text().split(";");
            break;
          case "info-author":
            mangaInfo.author = [];
            $(el)
              .find("td.table-value > a.a-h")
              .each((_, el) => {
                mangaInfo.author?.push($(el).text());
              });
            break;
          case "info-status":
            mangaInfo.status = $(el).find("td.table-value").text();
            break;
          case "info-genres":
            mangaInfo.genres = [];
            $(el)
              .find("td.table-value > a.a-h")
              .each((_, el) => {
                mangaInfo.genres?.push($(el).text());
              });
            break;
        }
      });
      mangaInfo.description = $("div.panel-story-info-description")
        .text()
        .trim()
        .replace("Description :\n", "")
        .trim();

      mangaInfo.image = $("div.story-info-left > span.info-image > img").attr(
        "src"
      );

      const chapters: ManganatoChapterList[] = [];
      $("div.panel-story-chapter-list > ul.row-content-chapter > li.a-h").each(
        (_, el) => {
          const title = $(el).find("a").text();
          const id = $(el)
            .find("a")
            .attr("href")
            ?.split("/")
            .slice(3, 5)
            .join("/");
          const date = $(el).find("span.chapter-time").attr("title");

          chapters.push({ title, id, date });
        }
      );
      mangaInfo.chapters = chapters.reverse();

      return mangaInfo;
    } catch (error) {
      Manganato.handleError(error, this.throwErrors);
    }
  }

  async scrapeImages(id: string) {
    try {
      const pageData = await this.htmlScraper(`${this.base_info}/${id}`);
      const $ = load(pageData.data);

      const images: string[] = [];
      $("div.container-chapter-reader > img").each((_, el) => {
        images.push($(el).attr("src")!);
      });

      return images;
    } catch (error) {
      Manganato.handleError(error, this.throwErrors);
    }
  }
}

export default Manganato;
