import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.openaiKey,
});

export async function reviewPR(diff, guidelines) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content: "You are a strict senior code reviewer.",
      },
      {
        role: "user",
        content: `
Guidelines:
${guidelines}

PR Diff:
${diff}

Return APPROVE or provide review comments.
`,
      },
    ],
  });

  return response.choices[0].message.content;
}
