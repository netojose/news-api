import {PlatformTest} from "@tsed/common";
import SuperTest from "supertest";
import Category from "./Category";
import {Server} from "../Server";
import Ajv from "ajv";

describe("Category controller", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    PlatformTest.bootstrap(Server, {
      mount: {
        "/": [Category]
      }
    })
  );
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("Getting categories list calling GET /categories", async () => {
    const user = {name: "user", email: "user_categories@email.com", password: "123456"};
    const responseResgister = await request.post("/auth/register").send(user);
    const {token} = responseResgister.body;

    const response = await request.get("/categories").set("Authorization", `Bearer ${token}`).expect(200);

    const ajv = new Ajv();
    const schema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          slug: {type: "string"},
          title: {type: "string"}
        },
        required: ["slug", "title"],
        additionalProperties: false
      }
    };

    const validate = ajv.compile(schema);
    const valid = validate(response.body);

    expect(valid).toBeTruthy();
  });
});
