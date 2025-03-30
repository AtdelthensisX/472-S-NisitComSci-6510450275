import { afterAll, describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import ReviewController from "../src/controllers/ReviewController";

const app = new Elysia().use(ReviewController);
const server = app.listen(3000); // เปลี่ยนเป็น 3000 ตามที่ขอ

describe("Review API", () => {
  it("get all reviews", async () => {
    const response = await fetch("http://localhost:3000/review/all");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });

  it("get reviews by course id", async () => {
    const response = await fetch("http://localhost:3000/review/course/01418112");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });

  it("add review success", async () => {
    const response = await fetch("http://localhost:3000/review/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_id: "01418112",
        uuid: "32dad50f-1445-4ffa-99fd-9fcf28af7f28",
        rating: 8,
        review_text: "Great course!",
      }),
    });

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("review_id"); // ปรับตามข้อมูลที่ backend ตอบกลับ
  });

  it("add review with invalid rating", async () => {
    const response = await fetch("http://localhost:3000/review/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_id: "01418112",
        uuid: "32dad50f-1445-4ffa-99fd-9fcf28af7f28",
        rating: 15, // ค่าที่ผิดพลาด
        review_text: "Invalid rating!",
      }),
    });

    expect(response.status).toBeGreaterThanOrEqual(400); // อาจเป็น 400 หรือ 500 ขึ้นอยู่กับ implementation
  });

  afterAll(() => {
    server.stop(); // ปิด server หลังเทสทั้งหมด
  });
});