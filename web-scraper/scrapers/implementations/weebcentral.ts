import BaseScraper from "../baseScraper";
import { config } from "dotenv";
import { load } from "cheerio";
import {
  chapter_list,
  MangaSearch,
  SearchResults,
  WeebImages,
} from "../../types/weebtypes";

config();

class WeebCentral extends BaseScraper {
  base = process.env.WEEBCENTRAL_BASE!;

  constructor() {
    const website = "WeebCentral";
    const base = process.env.WEEBCENTRAL_BASE!;
    super(base);
  }

  async scrapeSearch(title: string) {
    try {
      const formData = new FormData();
      formData.append("text", title);

      const pageData = await this.htmlScraper(
        `${this.base}/search/simple?location=main`,
        "POST",
        formData,
        {
          Referer: "https://weebcentral.com/",
          Origin: "https://weebcentral.com",
        }
      );
      const $ = load(pageData.data);

      const hotUpdates = $("section[id='quick-search-result']");
      if (!hotUpdates.length) {
        return {
          success: false,
          error: "No search results found",
        };
      }

      const data: SearchResults[] = [];
      $("a.btn.join-item").each((_, element) => {
        const title = $(element).find("div.line-clamp-2").text().trim();
        const image = $(element).find("source").attr("srcset");
        const idParts = $(element).attr("href")?.split("/")!;
        const id = `${idParts[4]}/${idParts[5]}`;

        data.push({ title, image, id });
      });

      return data;
    } catch (error) {
      return WeebCentral.handleError(error, this.throwErrors);
    }
  }

  async scrapeInfo(id: string) {
    try {
      const url = `${this.base}/series/${id}`;
      const pageData = await this.htmlScraper(url);
      const $ = load(pageData.data);

      const mangaInfo: MangaSearch = {};
      mangaInfo.title = $("h1.hidden").text();
      mangaInfo.description = $("p.whitespace-pre-wrap").text().trim();

      $("ul.flex.flex-col.gap-4 > li").each((_, el) => {
        const key = $(el).find("strong").text().trim().toLowerCase();
        switch (key) {
          case "author(s):":
            mangaInfo.authors = [];
            $(el)
              .find("span > a")
              .each((_, el) => {
                mangaInfo.authors!.push($(el).text());
              });
            break;
          case "type:":
            mangaInfo.type = $(el).find("a").text();
            break;
          case "status:":
            mangaInfo.status = $(el).find("a").text();
            break;
          case "tags(s):":
            mangaInfo.genres = [];
            $(el)
              .find("span")
              .each((_, el) => {
                mangaInfo.genres!.push($(el).find("a").text());
              });
        }
      });

      // getting chapter data
      const chapterData = await this.htmlScraper(
        `${this.base}/series/${id.split("/")[0]}/full-chapter-list`
      );
      const chapters: chapter_list[] = [];
      const $$ = load(chapterData.data);
      $$("a").each((_, el) => {
        const id = $(el).attr("href")?.split("/")[4];
        const title = $(el)
          .find("span.grow.flex.items-center")
          .find("span[class='']")
          .text();
        const date = new Date($(el).find("time").text()).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
        chapters.push({ id, title, date });
      });
      mangaInfo.chapters = chapters.reverse();

      return mangaInfo;
    } catch (error) {
      return WeebCentral.handleError(error, this.throwErrors);
    }
  }

  async scrapeImages(id: string) {
    try {
      const pageData = await this.htmlScraper(
        `${this.base}/chapters/${id}/images?is_prev=False&current_page=1&reading_style=long_strip`
      );
      const $ = load(pageData.data);
      const images_list: string[] = [];

      $("img").each((_, el) => {
        images_list.push($(el).attr("src")!);
      });
      return images_list;
    } catch (error) {
      return WeebCentral.handleError(error, this.throwErrors);
    }
  }
}

export default WeebCentral;
