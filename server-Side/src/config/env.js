import dotenv from "dotenv";

dotenv.config();

export const getRequiredEnv = (name) => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const jwtSecret = getRequiredEnv("JWT_SECRET");
export const frontendUrl = getRequiredEnv("FRONTEND_URL");