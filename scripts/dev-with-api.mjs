import { spawn } from "node:child_process";

const opts = { stdio: "inherit", shell: true };

const api = spawn("node server/otp-server.mjs", opts);
const web = spawn("vite", opts);

const stopAll = () => {
  api.kill();
  web.kill();
};

process.on("SIGINT", stopAll);
process.on("SIGTERM", stopAll);
