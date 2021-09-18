process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let item = { name: "Salmon", price: 9.99 }

beforeEach(() => {
    items.push(item);
});

afterEach(() => {
    items.length = 0;
});

describe("/items", () => {
    test("Get list of items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{name: "Salmon", price: 9.99}]);
    });

    test("Responds with 404 if can't find item", async () => {
        const res = await request(app).get("/items/test");
        expect(res.statusCode).toBe(404);
    });

    test("POST new item", async () => {
        const res = await request(app)
            .post("/items")
            .send({name: "Carrot", price: 1.99});
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added: {name: "Carrot", price: 1.99}});
    });
});

// patch
describe("PATCH /items/:name", () => {
    test("Update item", async () => {
        const res = await request(app)
            .patch(`/items/${item.name}`)
            .send({name: "Tomato", price: 3.90});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            updated: {name: "Tomato", price: 3.90}
        });
    });

    test("404 if item invalid", async () => {
        const res = await request(app).patch(`/items/test`);
        expect(res.statusCode).toBe(404);
    })
});

// delete
describe("DELETE /items/:name", function() {
    test("Deletes a single a cat", async function() {
      const res = await request(app).delete(`/items/${item.name}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "deleted" });
    });
  });