import * as environment from "dotenv";

export const set = (variable: string, value: string): void => {
  process.env[variable] = value;
};

export const readEnvironmentFile = (envFile: string): void => {
  environment.config({ path: envFile });
};

export const getCurrentEnvironment = (): NodeJS.ProcessEnv => {
  return process.env;
};
