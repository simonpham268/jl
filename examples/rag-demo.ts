import { TwoStageRAG, QdrantStore, Embedder } from "../src/rag";

async function main() {
  const embedder = await Embedder.create();
  const store = await QdrantStore.create("rag_docs", embedder);
  const rag = await TwoStageRAG.create(store, embedder);

  const docs = [
    "Playwright is a framework for end-to-end testing of modern web apps. It supports Chromium, Firefox and WebKit with a single API and runs tests in parallel.",
    "Reranking in a RAG pipeline uses a cross-encoder to re-score the candidates returned by the first-stage vector search, improving precision of the final context.",
    "A bi-encoder embeds query and document separately, which is fast and scales to millions of vectors, but is less accurate than a cross-encoder that reads the pair jointly.",
    "ChromaDB and Qdrant are vector databases that store embeddings and support cosine similarity search, suitable for RAG retrieval.",
  ];

  const n = await rag.index(docs, "demo_notes");
  console.log(`Indexed ${n} chunks\n`);

  const query = "How does reranking improve a RAG pipeline?";
  const results = await rag.search(query, 4, 2);

  results.forEach((r, i) => {
    console.log(`#${i + 1}  vector=${r.vectorScore.toFixed(3)}  rerank=${r.rerankScore?.toFixed(3)}`);
    console.log(`    ${r.text.slice(0, 90)}...\n`);
  });

  console.log("----- PROMPT -----");
  console.log(TwoStageRAG.buildPrompt(query, results));
}

main().catch(console.error);
