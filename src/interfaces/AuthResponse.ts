import UserResponse from "./UserResponse";

export default interface AuthToken {
  token: string;
  user: UserResponse;
}
