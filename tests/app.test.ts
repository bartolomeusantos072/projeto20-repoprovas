import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/config/database";
import { TCreateTestData } from "../src/utils/typeUtils";
import laboratoryFactory from "./factories/laboratoryFactory";
import { tokenFactory } from "./factories/tokenFactory";
import userFactory from "./factories/userFactory";


beforeEach(async () => {
  await laboratoryFactory.deleteAllData();
});

describe("Users Test", () => {
  it("POST /signup", async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await supertest(app).post("/sign-up").send(user);

    const createUser = await prisma.users.findFirst({
      where: { email: user.email }
    });
    expect(createUser).not.toBeNull();
  });

  it("GET /signin", async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    userFactory.userCreateFactory(user);
    const response = await supertest(app).post("/sign-in").send(user);
    const { token } = response.body;
    expect(token).not.toBeNull();
  });

});
describe("tests about tests", () => {
  it("Create test", async () => {
    const { category, discipline, teacher } = await laboratoryFactory.laboratoryOneTeacherWithOneTest();

    const test: TCreateTestData = {
      name: faker.lorem.words(5),
      pdfUrl: faker.internet.url(),
      categoryId: category.id,
      disciplineId: discipline.id,
      teacherId: teacher.id,
    };

    const token = await tokenFactory();

    const response = await supertest(app)
      .post("/tests")
      .set("Authorization", `Bearer ${token}`)
      .send(test)

    expect(response.status).toBe(201);

  });

  it("Return tests group by disciplines", async () => {
    await laboratoryFactory.laboratoryOneTeacherWithOneTest();
    const token = await tokenFactory();

    const response = await supertest(app)
      .get("/tests?groupBy=disciplines")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.tests.length).toEqual(3);
    expect(response.body.tests[0].disciplines.length).toEqual(1);
  })

  it("Return tests group by teachers", async () => {
    const scenario = await laboratoryFactory.laboratoryTwoTeachersWithTwoTestsEach();
    const token = await tokenFactory();
    const response = await supertest(app)
      .get("/tests?groupBy=teachers")
      .set("Authorization", `Bearer ${token}`);

    const { tests } = response.body;
    expect(tests.length).toBe(2);
    expect(tests[0].teacher).toBe(scenario.teachers[0].name);
    expect(tests[0].categories.length).toBe(1);
    expect(tests[0].categories[0].tests.length).toBe(2);

    expect(tests[1].teacher).toBe(scenario.teachers[1].name);
    expect(tests[1].categories.length).toBe(1);
    expect(tests[1].categories[0].tests.length).toBe(2);
  });


});
afterAll(async () => {
  await prisma.$disconnect();
});
