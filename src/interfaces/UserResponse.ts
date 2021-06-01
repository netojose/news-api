import UserEntity from "../entities/User";

type UserResponse = Omit<UserEntity, "password">;

export default UserResponse;
