import { InitOptions } from "payload/config"
import payload from "payload"
import "dotenv/config"
import path from "path"
import express from "express"
import { createServer } from "node:http"
import { Server } from "socket.io"
import session from "express-session"
import MongoStore from "connect-mongo"
import cors from "./utils/load-cors-from-env"

const app = express()
app.set("trust proxy", 1)

declare module "payload" {
  interface Payload {
    io?: Server;
  }
}

const httpServer = createServer(app)

// Session middleware setup
const sessionMiddleware = session({
    cookie: {
        secure: false, // Required for localhost development, for production see: https://www.npmjs.com/package/express-session#cookiesecure
        httpOnly: true, // Hides cookie from javascript, details : https://www.npmjs.com/package/express-session#cookiehttponly
        sameSite: false, // Required setting for making this work cross-browser with client on different host, see: https://www.npmjs.com/package/express-session#cookiesamesite
    },
    resave: false, // Not required, see for details: https://www.npmjs.com/package/express-session#resave
    secret: process.env.PAYLOAD_SECRET,
    saveUninitialized: true, // Required, cause on initialisation it sets the socketID to the session
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URI
    })
})

app.use(sessionMiddleware) // Apply session middleware first
payload.io = new Server(httpServer, {
    cors: {
        origin: cors, // Array of authorized hosts
        methods: ["GET", "POST"], // Required setting
        credentials: true // This property is required when server host differs from client host eg. http://localhost:3000 VS http://localhost:3001
    }
})

// Ensure session middleware is used on the socket.io engine as well
payload.io.engine.use(sessionMiddleware)

app.use(express.static(path.join(__dirname, "public")))

httpServer.listen(process.env.PORT || 3000)

export const start = async (args?: Partial<InitOptions>) => {
    await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        express: app, // Adding Express instance
        email: {
            fromName: process.env.ADMIN_EMAIL_FROM_NAME,
            fromAddress: process.env.ADMIN_EMAIL_FROM_ADDRESS,
            logMockCredentials: true,
            transportOptions: {
                host: process.env.SMTP_HOST,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                port: Number(process.env.SMTP_PORT),
                secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false (the default) for 587 and others
                // requireTLS: true,
            },
        },
        onInit: async () => {
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
            payload.logger.info(`Cors: ${typeof cors}`)
        },
        ...(args || {}),
    })
  
    app.get("/", (_, res) => {
        res.redirect("/admin")
    })
}

start()
