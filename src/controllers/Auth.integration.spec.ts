import {PlatformTest} from "@tsed/common";
import SuperTest from "supertest";
import Auth from "./Auth";
import {Server} from "../Server";

const user = {name: "Test user", email: "test@test.com", password: "123456"};

describe("Auth controller", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    PlatformTest.bootstrap(Server, {
      mount: {
        "/": [Auth]
      }
    })
  );
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("Register / Login / me", async () => {
    // Register
    const responseResgister = await request.post("/auth/register").send(user).expect(200);
    expect(responseResgister.body.token).toBeDefined();
    expect(responseResgister.body.user.name).toBe(user.name);

    // Login
    const responseLogin = await request.post("/auth/login").send({email: user.email, password: user.password}).expect(200);
    expect(responseLogin.body.token).toBeDefined();
    expect(responseLogin.body.user.name).toBe(user.name);

    // Me info
    const responseMe = await request.get("/auth/me").set("Authorization", `Bearer ${responseLogin.body.token}`).expect(200);
    expect(responseMe.body.name).toBe(user.name);
    expect(responseMe.body.email).toBe(user.email);

    // Wrong credentials
    await request.post("/auth/login").send({email: user.email, password: "WRONG-PASSWORD"}).expect(401);
  });
});
