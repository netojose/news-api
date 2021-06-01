import {hash} from "bcrypt";

const SALT_ROUNDS = 10;

export default async function encryptPassword(password: string): Promise<string> {
  return await hash(password, SALT_ROUNDS);
}
