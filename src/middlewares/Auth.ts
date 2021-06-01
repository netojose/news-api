import {IMiddleware, Middleware, Req} from "@tsed/common";
import {Forbidden} from "@tsed/exceptions";

import User from "../entities/User";
import extractIdFromJwt from "../utils/extractIdFromJwt";

@Middleware()
export default class Auth implements IMiddleware {
  public async use(@Req() request: Req): Promise<void> {
    const token = request.header("Authorization");

    if (!token) {
      throw new Forbidden("Forbidden");
    }

    const id = extractIdFromJwt(token);
    if (!id) {
      throw new Forbidden("Forbidden");
    }

    const user = await User.findOne({where: {id}});

    if (!user) {
      throw new Forbidden("Forbidden");
    }
  }
}
