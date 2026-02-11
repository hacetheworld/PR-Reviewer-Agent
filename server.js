// server.js

import express from "express";
import { runAgent } from "./agent/runAgent.js";

const app = express();
app.use(express.json());

app.post("/github-webhook", async (req, res) => {
  if (req.body.action !== "opened") {
    return res.send("ignored");
  }

  await runAgent(req.body.pull_request);

  res.send("ok");
});

app.listen(3000);
