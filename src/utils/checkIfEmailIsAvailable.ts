import {ValidationError} from "@tsed/common";

import User from "../entities/User";

export default async function checkIfEmailIsAvailable(email: string): Promise<never | void> {
  const user = await User.findOne({where: {email}});

  if (user) {
    throw new ValidationError("This email is already used", [
      {
        dataPath: ".email",
        message: "This email is already used"
      }
    ]);
  }
}
