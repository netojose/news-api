import {Controller, Get, PathParams, QueryParams, UseAuth} from "@tsed/common";
import {ContentType} from "@tsed/schema";

import AuthMiddleware from "../middlewares/Auth";
import EconomistService from "../services/Economist";
import NewsItem from "../interfaces/NewsItem";
import NewsList from "../interfaces/NewsList";

@Controller("/news")
export default class News {
  constructor(private readonly economistService: EconomistService) {}

  @Get("/:category")
  @UseAuth(AuthMiddleware)
  @ContentType("application/json")
  async list(@PathParams("category") category: string, @QueryParams("page") page: string): Promise<NewsList> {
    const pageNumber = page ? Number(page) : 1;
    return await this.economistService.getNewsByCategory(category, pageNumber);
  }

  @Get("/item/:slug([0-9a-z-/]+)")
  @ContentType("application/json")
  @UseAuth(AuthMiddleware)
  async show(@PathParams("slug") slug: string): Promise<NewsItem> {
    return await this.economistService.getNewsItemBySlug(slug);
  }
}
