import {Injectable} from "@tsed/common";

import Categories from "../interfaces/Categories";
import NewsList from "../interfaces/NewsList";
import NewsItem from "../interfaces/NewsItem";
import CacheService from "./Cache";
import CrawlerService from "./Crawler";

@Injectable()
export default class Economist {
  #url: string;
  constructor(private cacheService: CacheService, private crawlerService: CrawlerService) {
    this.#url = String(process.env.CRAWLER_TARGET);
  }

  public async getCategories(): Promise<Categories> {
    return await this.cacheService.remember<Categories>("categories", async () => {
      await this.crawlerService.setPageDom(this.#url);
      return this.crawlerService.getLinksFromGroupSelector(".ds-navigation-list-items--section li a");
    });
  }

  public async getNewsByCategory(category: string, page: number): Promise<NewsList> {
    return await this.cacheService.remember<NewsList>({fn: "newsByCategory", category, page}, async () => {
      await this.crawlerService.setPageDom(`${this.#url}/${category}?page=${page}`);
      const categoryTitle = this.crawlerService.getTextNodeFromSelector("h1.section-collection-headline") ?? "";
      const itemsNodeList = this.crawlerService.getItemsBySelector(".ds-layout-grid.teaser.teaser--section-collection");

      const items = Array.from(itemsNodeList).map((item) => {
        const srcsetImage = (<Element>item).querySelector(".teaser__image img")?.getAttribute("srcset") ?? "";
        const textBlock = (<Element>item).querySelector(".teaser__text");
        const anchor = (<Element>textBlock).querySelector("h2 a");
        const image = this.getImageFromSrcset(srcsetImage);
        const header = (<Element>anchor).querySelector("span.teaser__subheadline")?.textContent ?? "";
        const title = (<Element>anchor).querySelector("span.teaser__headline")?.textContent ?? "";
        const excerpt = (<Element>textBlock).querySelector("p")?.textContent ?? "";
        const uri = (<Element>anchor).getAttribute("href") ?? "";

        return {
          image,
          header,
          title,
          excerpt,
          uri
        };
      });

      const pagNodeList = this.crawlerService.getItemsBySelector(".ds-pagination__item");
      const lastPage = [...Array.from(pagNodeList)][pagNodeList.length - 1].textContent ?? 1;

      return {
        category,
        categoryTitle,
        items,
        pagination: {
          currentPage: +page,
          totalPages: +lastPage
        }
      };
    });
  }

  public async getNewsItemBySlug(slug: string): Promise<NewsItem> {
    return await this.cacheService.remember<NewsItem>({fn: "newsItemBySlug", slug}, async () => {
      const url = `${this.#url}/${slug}`;
      await this.crawlerService.setPageDom(url);
      const article = this.crawlerService.getItemBySelector("#content article");
      const header = article?.querySelector("header");
      const healine = header?.querySelector("h1 span.article__headline")?.textContent ?? "";
      const subhealine = header?.querySelector("h1 span.article__subheadline")?.textContent ?? "";
      const description = header?.querySelector("p")?.textContent ?? "";
      const date = article?.querySelector("div.layout-article-meta time")?.textContent ?? "";
      const location = article?.querySelector("div.layout-article-meta p")?.textContent ?? "";
      const category = article?.querySelector("span.article__section-headline a")?.textContent ?? "";
      const articleContent = article?.querySelector(".layout-article-body");
      const imageElement = article?.querySelector("div.article__lead-image img");
      const image = imageElement?.getAttribute("src") ?? "";

      const toRemove = articleContent?.querySelectorAll(".layout-sticky-rail, .article__aside, .layout-article-promo");
      Array.from(toRemove ?? []).forEach((node) => {
        articleContent?.removeChild(node);
      });

      const content = articleContent?.innerHTML ?? "";

      return {
        url,
        category,
        healine,
        subhealine,
        description,
        date,
        location,
        image,
        content
      };
    });
  }

  private getImageFromSrcset(srcset: string): string | null {
    const regex = /[^"\'=\s]+\.(jpe?g|png|gif)/g;
    const found = srcset.match(regex);
    return found ? found[2].split(",")[1] : null;
  }
}
