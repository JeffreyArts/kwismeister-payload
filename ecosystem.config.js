const env = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env"

require("dotenv").config({ path: env })

module.exports = {
    apps: [{
        name: "Kwis - Jeffreyarts.nl", // Fill in a name here to recoginize your project in the list of PM2 instances
        script: "yarn",
        args: "serve",
        env: {
            NODE_ENV: "staging"
        }
    }],

    deploy: {
        staging: {
            user: process.env.DEPLOYMENT_USER,
            host: process.env.DEPLOYMENT_HOST,
            ref: "origin/main",
            repo: "git@jeff-payload.github.com:JeffreyArts/kwis-backend.git",
            path: process.env.DEPLOYMENT_PATH,
            "post-deploy": "nvm use 20 && yarn install && yarn build && pm2 reload ecosystem.config.js --env staging"
        }
    } 
}
