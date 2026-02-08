import DotenvFlow from 'dotenv-flow'

DotenvFlow.config()

export default {
    DATABASE_URL: process.env.DATABASE_URL,
    ENV: process.env.Env,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL
}
