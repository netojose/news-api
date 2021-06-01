import {Injectable} from "@tsed/common";
import {sign} from "jsonwebtoken";
import {compare} from "bcrypt";

import UserEntity from "../entities/User";

@Injectable()
export default class Auth {
  public async create(name: string, email: string, password: string): Promise<UserEntity> {
    const user = UserEntity.create({name, email, password});
    await user.save();
    return user;
  }

  public createToken(user: UserEntity): string {
    const JWT_SECRET = String(process.env.JWT_SECRET);
    return sign({id: user.id}, JWT_SECRET, {expiresIn: "365 days"});
  }

  public async login(email: string, password: string): Promise<{token: string; user: UserEntity} | null> {
    const user = await UserEntity.findOne({where: {email}});

    if (!user) {
      return null;
    }

    const matches = await compare(password, user.password);

    if (matches) {
      const token = this.createToken(user);
      return {user, token};
    }

    return null;
  }

  public async getUserById(id: number): Promise<UserEntity | undefined> {
    return await UserEntity.findOne({where: {id}});
  }
}
