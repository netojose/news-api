import {Controller, Get, UseAuth} from "@tsed/common";
import {ContentType} from "@tsed/schema";

import AuthMiddleware from "../middlewares/Auth";
import EconomistService from "../services/Economist";
import Categories from "../interfaces/Categories";

@Controller("/categories")
export default class Category {
  constructor(private readonly economistService: EconomistService) {}

  @Get("/")
  @ContentType("application/json")
  @UseAuth(AuthMiddleware)
  async list(): Promise<Categories> {
    return await this.economistService.getCategories();
  }
}
