export const settings = {
  // Database
  DB_NAME: process.env.DB_NAME || "postgres",
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "postgres",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 5432,

  PORT: process.env.NEST_PORT || 8000,

  // Firebase
  FB_PROJECT_ID: process.env.FB_PROJECT_ID,
  FB_CLIENT_EMAIL: process.env.FB_CLIENT_EMAIL,
  FB_PRIVATE_KEY: process.env.FB_PRIVATE_KEY
} as const
