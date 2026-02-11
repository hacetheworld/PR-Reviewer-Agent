// server.js
import dotenv from "dotenv";

dotenv.config();

import express from "express";
import { runAgent } from "./agent/runAgent.js";

const app = express();
app.use(express.json());
app.use("/health", (req, res) => {
  res.json({ msg: "Health is good..." });
});
app.post("/github-webhook", async (req, res) => {
  console.log("Yes webhook trgieerd this agent.....");
  console.log(req.body);
  if (req.body.action !== "opened") {
    return res.send("ignored");
  }

  await runAgent(req.body.pull_request);

  res.send("ok");
});

app.listen(5001);
