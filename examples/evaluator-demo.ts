import { TwoStageRAG, QdrantStore, InMemoryVectorStore, RagEvaluator, Embedder } from "../src/rag";
import type { VectorStore } from "../src/rag";

async function fakeAgent(question: string): Promise<string> {
  const responses: Record<string, string> = {
    "What is your refund policy?":
      "You can request a refund within 30 days of purchase. Contact support@company.com with your order ID.",
    "How do I reset my password?":
      "Click 'Forgot Password' on the login page and enter your email. You will receive a reset link within 5 minutes.",
    "What payment methods do you accept?":
      "We accept VISA, Mastercard, PayPal, and bank transfers.",
    "Can I fly to the moon for free?":
      "Yes, our premium plan includes a free trip to the moon every month.",
  };
  return responses[question] ?? "I don't know.";
}

async function resolveStore(embedder: Embedder): Promise<VectorStore> {
  try {
    return await QdrantStore.create("business_docs", embedder);
  } catch {
    console.warn("Qdrant unavailable — falling back to InMemoryVectorStore.\n");
    return new InMemoryVectorStore();
  }
}

async function main() {
  const embedder = await Embedder.create();
  const store = await resolveStore(embedder);
  const rag = await TwoStageRAG.create(store, embedder);
  const evaluator = new RagEvaluator(embedder, store);

  const businessDocs = [
    "Refund policy: Customers may request a full refund within 30 days of purchase by contacting support@company.com with their order ID. Refunds are processed within 5-7 business days.",
    "Password reset: To reset your password, click the 'Forgot Password' link on the login page. Enter your registered email address and a reset link will be sent within 5 minutes.",
    "Payment methods: We accept VISA, Mastercard, American Express, PayPal, and bank transfers. All transactions are secured with 256-bit SSL encryption.",
    "Shipping policy: Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee. Free shipping on orders over $50.",
  ];

  await rag.index(businessDocs, "business_knowledge");
  console.log("Knowledge base indexed.\n");

  const testCases = [
    "What is your refund policy?",
    "How do I reset my password?",
    "What payment methods do you accept?",
    "Can I fly to the moon for free?",
  ];

  const results = [];
  for (const question of testCases) {
    const response = await fakeAgent(question);
    const result = await evaluator.evaluate(question, response);
    results.push(result);

    console.log(`Q: ${question}`);
    console.log(`A: ${response}`);
    console.log(`→ ${result.verdict}  score=${result.score.toFixed(3)}  coverage=${result.coverage.covered}/${result.coverage.total}`);
    console.log();
  }

  const summary = RagEvaluator.summary(results);
  console.log("=== SUMMARY ===");
  console.log(`Total:         ${summary.total}`);
  console.log(`PASS:          ${summary.passed}`);
  console.log(`FAIL:          ${summary.failed}`);
  console.log(`HALLUCINATION: ${summary.hallucinated}`);
  console.log(`Avg score:     ${summary.avgScore.toFixed(3)}`);
}

main().catch(console.error);
