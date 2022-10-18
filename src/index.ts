import "dotenv/config";
import Api from "@Api/Api";
import { Logger } from "@Api/utils/logger";
const log = Logger(__filename);

try {
  const api = new Api();
  api.start();
} catch (e) {
  log.error(e);
  throw e;
}

process.on("uncaughtException", (err) => {
  log.error("uncaughtException", err);
  process.exit(1);
});

process.on("SIGTERM", () => {
  log.info("Server received SIGTERM");
  return process.exit(0);
});
