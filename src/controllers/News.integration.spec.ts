import {PlatformTest} from "@tsed/common";
import SuperTest from "supertest";
import News from "./News";
import {Server} from "../Server";

describe("News controller", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    PlatformTest.bootstrap(Server, {
      mount: {
        "/": [News]
      }
    })
  );
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("Getting error calling GET /news/:category without credentials", async () => {
    await request.get("/news/china").expect(403);
  });

  it("Getting error calling GET /news/item/:slug without credentials", async () => {
    await request.get("/news/item/some-news").expect(403);
  });
});
