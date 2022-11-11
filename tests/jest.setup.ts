import { config } from "dotenv";

config({ path: ".env.test" });

jest.setTimeout(100000);
