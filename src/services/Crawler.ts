import {Injectable} from "@tsed/common";
import {JSDOM} from "jsdom";
import got from "got";
import LinkItem from "../interfaces/LinkItem";

@Injectable()
export default class Crawler {
  //   constructor(private httpService: HttpService) {}

  #dom: JSDOM;

  async setPageDom(url: string): Promise<void> {
    const response = await got(url);
    this.#dom = new JSDOM(response.body, {url, contentType: "text/html"});
  }

  public getLinksFromGroupSelector(selector: string): Array<LinkItem> {
    const nodeList = this.#dom.window.document.querySelectorAll<HTMLAnchorElement>(selector);

    return Array.from(nodeList).reduce(
      (acc, current) => [
        ...acc,
        {
          slug: (current.getAttribute("href") ?? "").slice(1),
          title: current.querySelector("span")?.textContent ?? ""
        }
      ],
      []
    );
  }

  public getTextNodeFromSelector(selector: string): string | null {
    const element = this.getItemBySelector(selector);
    return element ? element.textContent : null;
  }

  public getItemBySelector(selector: string): HTMLElement | null {
    return this.#dom.window.document.querySelector<HTMLElement>(selector);
  }

  public getItemsBySelector(selector: string): NodeList {
    return this.#dom.window.document.querySelectorAll<HTMLElement>(selector);
  }
}
