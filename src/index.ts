import { env, serve } from 'bun'
import { Hono } from 'hono'
import { AuthController } from './controllers/AuthController'
import pino from "pino";
import logger from "./modules/logger"
import { RegisterUser, RegisterUserType } from './models/RegisterUser.dto';
import { zValidator } from '@hono/zod-validator';
const app = new Hono()
const api = new Hono();

app.get('/', (c) => {
  return c.text("WE ARE ONLINEEE BABYYY")
})

api.get('/', (c) => {
  return c.text("WE ARE ONLINEEE BABYYY")
})

api.post("/auth/register", zValidator("json", RegisterUser), (c) => AuthController.register(c))

app.route("/api", api);

serve({
  fetch: app.fetch,
  port: env.PORT,
})

//export default app

