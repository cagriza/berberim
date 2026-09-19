import express from "express";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createDatabase } from "./db.js";
import { registerRoutes } from "./routes.js";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = rootDir;
const port = Number(process.env.PORT || 3000);

const app = express();
const db = await createDatabase();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.static(publicDir, { extensions: ["html"] }));

registerRoutes(app, db);

app.get("*", (req, res) => {
  res.sendFile(join(publicDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Berberim Club API http://localhost:${port}`);
});
