import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text("WE ARE ONLINEEE BABYYY")
})


export default app
