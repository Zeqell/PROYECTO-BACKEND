import dotenv from "dotenv"
import program from "../utils/commander.js"

let {mode} = program.opts()

dotenv.config({
    path: mode === "production" ? "./.env.production" : "./.env.development"
})

const configObject = {
    port: process.env.PUERTO,
    mongo_url: process.env.MONGO_URL,
    secret_or_key: process.env.SECRET_OR_KEY,
    cookie_token: process.env.TOKEN,
    secret: process.env.SECRET,
    client_id: process.env.CLIENTID,
    client_secret: process.env.CLIENTSECRET
}

export default configObject