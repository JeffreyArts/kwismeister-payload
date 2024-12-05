// import { payloadCloud } from "@payloadcms/plugin-cloud"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { webpackBundler } from "@payloadcms/bundler-webpack"
import { slateEditor } from "@payloadcms/richtext-slate"
import { buildConfig } from "payload/config"
import { config } from "dotenv"
import path from "path"
import quizSocket from "./socket/quiz"

import { Users } from "./collections/Users"
import { Media } from "./collections/Media"
import { QuizSession } from "./collections/QuizSession"
import { Quiz } from "./collections/Quiz"
import { QuizQuestion } from "./collections/QuizQuestion"
import { QuizRound } from "./collections/QuizRound"
import { QuizTheme } from "./collections/QuizTheme"
import { QuizPlayer } from "./collections/QuizPlayer"

import cors from "./utils/load-cors-from-env"
import PluginSocketIO from "./plugins/socket-io/index"

const mockModulePath = path.resolve(__dirname, "./mocks/mock-file.js")

export default buildConfig({
    admin: {
        user: Users.slug,
        livePreview: {
            // url:  `${process.env.PAYLOAD_PUBLIC_CLIENT_URI}/live-preview`,
            url: ({ data, documentInfo, locale }) => {
                // const encodedData = Buffer.from(JSON.stringify(data)).toString("base64")
                return   `${process.env.PAYLOAD_PUBLIC_CLIENT_URI}/live-preview?disableAnimation=true`
            },
            collections: ["pages", "projects", "pieces"],
            breakpoints: [
                {
                    label: "Mobile",
                    name: "mobile",
                    width: 375,
                    height: 812,
                },
                {
                    label: "Tablet",
                    name: "tablet",
                    width: 768,
                    height: 1024,
                },
                {
                    label: "Desktop",
                    name: "desktop",
                    width: 1440,
                    height: 900,
                },
            ],
        },
        bundler: webpackBundler(),
        webpack: (config) => {
            return {
                ...config, 
                resolve: {
                    ...config.resolve,
                    alias: {
                        ...config.resolve.alias,
                        "@": path.resolve(__dirname, "./"),
                        // ["fs"]: mockModulePath,
                        ["fs/promises"]: mockModulePath,
                    },
                }
            }
        },
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI,
    }),
    collections: [
        Users,
        Media,
        QuizSession,
        Quiz,
        QuizQuestion,
        QuizRound,
        QuizTheme,
        QuizPlayer
    ],
    upload: {
        limits: {
            fileSize: 8000000, // 8MB, written in bytes
        },
    },
    cors: cors.includes("*") ? "*" : cors,
    editor: slateEditor({}),
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
    },
    plugins: [
        PluginSocketIO({
            enabled: true,
            dev: true,
            onConnect: [ quizSocket ]
        })
    ],
    typescript: {
        outputFile: path.resolve(__dirname, "payload-types.ts"),
    },
})
