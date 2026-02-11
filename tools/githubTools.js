import axios from "axios";

const headers = {
  Authorization: `Bearer ${process.env.githubToken}`,
  Accept: "application/vnd.github.v3+json",
};

export async function getPRDiff(pr) {
  const res = await axios.get(pr.url, {
    headers: {
      ...headers,
      Accept: "application/vnd.github.v3.diff",
    },
  });

  return res.data;
}

export async function commentPR(pr, body) {
  await axios.post(`${pr.issue_url}/comments`, { body }, { headers });
}

export async function approvePR(pr) {
  await axios.post(
    `${pr.url}/reviews`,
    {
      event: "APPROVE",
    },
    { headers },
  );
}
