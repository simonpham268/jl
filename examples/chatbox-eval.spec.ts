import { test, expect } from "@playwright/test";
import { RagEvaluator, QdrantStore, Embedder } from "../src/rag";

// Shared evaluator — initialized once for the suite
let evaluator: RagEvaluator;

test.beforeAll(async () => {
  const embedder = await Embedder.create();
  const store = await QdrantStore.create("business_docs", embedder);
  evaluator = new RagEvaluator(embedder, store);
});

test.describe("AI Chatbox — RAG Evaluation", () => {

  test("refund policy answer is semantically correct", async ({ page }) => {
    await page.goto("https://your-app.com/chat");
    await page.getByPlaceholder("Ask a question...").fill("What is your refund policy?");
    await page.keyboard.press("Enter");
    await page.waitForSelector(".agent-response");

    const response = await page.locator(".agent-response").last().innerText();
    const result = await evaluator.evaluate("What is your refund policy?", response);

    expect(result.verdict, `Score: ${result.score.toFixed(3)}`).toBe("PASS");
    expect(result.coverage.covered).toBeGreaterThanOrEqual(2);
  });

  test("agent does not hallucinate on out-of-scope questions", async ({ page }) => {
    await page.goto("https://your-app.com/chat");
    await page.getByPlaceholder("Ask a question...").fill("Can I fly to the moon for free?");
    await page.keyboard.press("Enter");
    await page.waitForSelector(".agent-response");

    const response = await page.locator(".agent-response").last().innerText();
    const result = await evaluator.evaluate("Can I fly to the moon for free?", response);

    expect(result.verdict).not.toBe("HALLUCINATION");
  });

  test("password reset flow is explained correctly", async ({ page }) => {
    await page.goto("https://your-app.com/chat");
    await page.getByPlaceholder("Ask a question...").fill("How do I reset my password?");
    await page.keyboard.press("Enter");
    await page.waitForSelector(".agent-response");

    const response = await page.locator(".agent-response").last().innerText();
    const result = await evaluator.evaluate("How do I reset my password?", response, {
      passThreshold: 0.80,
      coverageN: 3,
      minCovered: 2,
    });

    expect(result.score).toBeGreaterThan(0.80);
    expect(result.verdict).toBe("PASS");
  });

});
