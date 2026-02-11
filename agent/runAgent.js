// agent/runAgent.js
import { getPRDiff, commentPR, approvePR } from "../tools/githubTools.js";
import { reviewPR } from "../clients/llmClient.js";

export async function runAgent(pr) {
  const diff = await getPRDiff(pr);

  const guidelines = `
   - follow clean code
   - avoid console logs
   - add tests
   `;

  const result = await reviewPR(diff, guidelines);

  if (result.includes("APPROVE")) {
    await approvePR(pr);
  } else {
    await commentPR(pr, result);
  }
}
