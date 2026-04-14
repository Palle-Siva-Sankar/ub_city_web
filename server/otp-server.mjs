import http from "node:http";
import { config } from "dotenv";

config();

const PORT = Number(process.env.OTP_API_PORT || 8787);
const ALLOWED_ORIGIN = process.env.OTP_ALLOWED_ORIGIN || "http://127.0.0.1:5173";
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID || "";

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
  });
  res.end(JSON.stringify(payload));
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
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

function assertTwilioConfigured() {
  return Boolean(ACCOUNT_SID && AUTH_TOKEN && VERIFY_SERVICE_SID);
}

function authHeader() {
  const token = Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString("base64");
  return `Basic ${token}`;
}

async function sendOtp(phone) {
  const params = new URLSearchParams({ To: phone, Channel: "sms" });
  const response = await fetch(
    `https://verify.twilio.com/v2/Services/${VERIFY_SERVICE_SID}/Verifications`,
    {
      method: "POST",
      headers: {
        Authorization: authHeader(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    },
  );
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to send OTP");
  }
}

async function verifyOtp(phone, code) {
  const params = new URLSearchParams({ To: phone, Code: code });
  const response = await fetch(
    `https://verify.twilio.com/v2/Services/${VERIFY_SERVICE_SID}/VerificationCheck`,
    {
      method: "POST",
      headers: {
        Authorization: authHeader(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    },
  );
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to verify OTP");
  }
  const data = await response.json();
  return data.status === "approved";
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 404, { error: "Not found" });
    return;
  }

  if (!assertTwilioConfigured()) {
    sendJson(res, 500, { error: "Twilio OTP server is not configured." });
    return;
  }

  try {
    const body = await parseBody(req);

    if (req.url === "/api/auth/send-otp") {
      const phone = String(body.phone || "").trim();
      if (!phone.startsWith("+")) {
        sendJson(res, 400, { error: "Phone must be in E.164 format." });
        return;
      }
      await sendOtp(phone);
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.url === "/api/auth/verify-otp") {
      const phone = String(body.phone || "").trim();
      const code = String(body.code || "").trim();
      if (!phone || code.length < 6) {
        sendJson(res, 400, { error: "Phone and 6-digit code are required." });
        return;
      }
      const approved = await verifyOtp(phone, code);
      if (!approved) {
        sendJson(res, 400, { error: "Invalid OTP." });
        return;
      }
      sendJson(res, 200, { ok: true });
      return;
    }

    sendJson(res, 404, { error: "Not found" });
  } catch (error) {
    sendJson(res, 500, { error: error instanceof Error ? error.message : "OTP server error" });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`OTP server running on http://127.0.0.1:${PORT}`);
});
