import {Controller, Post, Get, BodyParams, HeaderParams, UseAuth} from "@tsed/common";
import {ContentType, Required, MinLength, MaxLength, Property, Email} from "@tsed/schema";
import {Unauthorized} from "@tsed/exceptions";
import omit from "lodash/omit";

import AuthMiddleware from "../middlewares/Auth";
import UserEntity from "../entities/User";
import AuthService from "../services/Auth";
import checkIfEmailIsAvailable from "../utils/checkIfEmailIsAvailable";
import extractIdFromJwt from "../utils/extractIdFromJwt";
import AuthResponse from "../interfaces/AuthResponse";
import UserResponse from "../interfaces/UserResponse";

class LoginParams {
  @Required()
  @Email()
  email: string;

  @Property()
  @MinLength(6)
  @MaxLength(36)
  password: string;
}

class RegisterParams {
  @Required()
  @Email()
  email: string;

  @Property()
  @MinLength(6)
  @MaxLength(36)
  password: string;

  @Required()
  @MinLength(4)
  @MaxLength(36)
  name: string;
}

@Controller("/auth")
export default class Auth {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  @ContentType("application/json")
  async register(@BodyParams() {name, email, password}: RegisterParams): Promise<AuthResponse> {
    await checkIfEmailIsAvailable(email);
    const user = await this.authService.create(name, email, password);
    const token = this.authService.createToken(user);
    return {token, user: this.formatUser(user)};
  }

  @Post("/login")
  @ContentType("application/json")
  async login(@BodyParams() {email, password}: LoginParams): Promise<AuthResponse> {
    const lognInfo = await this.authService.login(email, password);

    if (!lognInfo) {
      throw new Unauthorized("Wrong credentials");
    }

    return {
      ...lognInfo,
      user: this.formatUser(lognInfo.user)
    };
  }

  @Get("/me")
  @UseAuth(AuthMiddleware)
  async me(@HeaderParams() {authorization}: {authorization: string | null}): Promise<UserResponse> {
    const id = extractIdFromJwt(authorization);

    if (!id) {
      throw new Unauthorized("Unauthenticated");
    }

    const user = await this.authService.getUserById(id);

    if (!user) {
      throw new Unauthorized("Unauthenticated");
    }

    return this.formatUser(user);
  }

  private formatUser(user: UserEntity): UserResponse {
    return omit(user, ["password"]);
  }
}
