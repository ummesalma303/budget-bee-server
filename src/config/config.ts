import 'dotenv/config'

export default {
    BCRYPT_SALT: process.env.BCRYPT_SALT,
    DATABASE_URL: process.env.DATABASE_URL,
    ENV: process.env.ENV,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? ' ',
    JWT_SECRET: process.env.JWT_SECRET ?? ' ',
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL
}
