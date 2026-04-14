import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "events.json");
const PUBLIC_DIR = path.join(__dirname, "public");
const PORT = Number(process.env.ACTIVITY_MONITOR_PORT || 8899);

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ events: [] }, null, 2), "utf8");
  }
}

function readStore() {
  ensureDataFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return { events: [] };
  }
}

function writeStore(store) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  });
  res.end(JSON.stringify(payload));
}

function sendHtml(res) {
  const htmlPath = path.join(PUBLIC_DIR, "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function aggregateUsers(events) {
  const users = new Map();
  for (const event of events) {
    const key = event.userId || event.email || event.username || "anonymous";
    if (!users.has(key)) {
      users.set(key, {
        userId: key,
        username: event.username || "",
        email: event.email || "",
        phone: event.phone || "",
        activities: 0,
        lastActivityAt: "",
        lastLoginAt: "",
      });
    }
    const row = users.get(key);
    row.activities += 1;
    row.lastActivityAt = event.timestamp || row.lastActivityAt;
    if (event.action === "LOGIN_SUCCESS") {
      row.lastLoginAt = event.timestamp || row.lastLoginAt;
      row.username = event.username || row.username;
      row.email = event.email || row.email;
      row.phone = event.phone || row.phone;
    }
  }
  return [...users.values()].sort((a, b) => (b.lastActivityAt || "").localeCompare(a.lastActivityAt || ""));
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.url === "/" && req.method === "GET") {
    sendHtml(res);
    return;
  }

  if (req.url === "/api/health" && req.method === "GET") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.url === "/api/activity" && req.method === "POST") {
    try {
      const body = await parseBody(req);
      const event = {
        id: crypto.randomUUID(),
        userId: String(body.userId || "").trim(),
        username: String(body.username || "").trim(),
        email: String(body.email || "").trim(),
        phone: String(body.phone || "").trim(),
        action: String(body.action || "UNKNOWN"),
        details: body.details || {},
        timestamp: body.timestamp || new Date().toISOString(),
      };
      const store = readStore();
      store.events.unshift(event);
      writeStore(store);
      sendJson(res, 201, { ok: true, eventId: event.id });
    } catch {
      sendJson(res, 400, { ok: false, error: "Invalid activity payload" });
    }
    return;
  }

  if (req.url === "/api/users" && req.method === "GET") {
    const store = readStore();
    sendJson(res, 200, { users: aggregateUsers(store.events) });
    return;
  }

  if (req.url?.startsWith("/api/user/") && req.method === "GET") {
    const userId = decodeURIComponent(req.url.replace("/api/user/", ""));
    const store = readStore();
    const events = store.events.filter((event) => {
      const key = event.userId || event.email || event.username || "anonymous";
      return key === userId;
    });
    sendJson(res, 200, { events });
    return;
  }

  sendJson(res, 404, { ok: false, error: "Not found" });
});

ensureDataFile();
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Activity monitor running on http://127.0.0.1:${PORT}`);
});
