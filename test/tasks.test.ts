import bcrypt from "bcrypt"
import supertest from "supertest";

import app from "../src/app.js";

import prisma from "../src/config/database";


describe("POST /newuser", () => {
    beforeEach(async () => {
        await prisma.user.deleteMany();
    });
    it("should answer with status 200 when credentials are valid", async () => {
      const user = {
        email: "test2@gmail.com",
        password: "doda123456"
      };
      const response = await supertest(app).post("/newuser").send({ email: user.email, password: user.password });
      expect(response.status).toEqual(201);
    });

    it("should answer with status 400 when credentials are not valid", async () => {
        const user = {
          email: "test2@gmail.com",
          password: "doda123456"
        };
    
            await prisma.user.create({
                data: {
                    email: user.email,
                    password: bcrypt.hashSync(user.password, 10)
                }
            });
    
        const response = await supertest(app).post("/newuser").send({ email: user.email, password: user.password });
        expect(response.status).toEqual(401);
      });

      it("should answer with status 400 when credentials are not valid", async () => {
        const user = {};
        const response = await supertest(app).post("/newuser").send(user);
        expect(response.status).toEqual(422);
      });
  });