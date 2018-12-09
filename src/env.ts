'use strict';

export const set = (variable: string, value: string): void => {
  process.env[variable] = value;
};

export const get = (variable: string): string | undefined => {
  return process.env[variable];
};

export const readEnvFile = (envFile: string): void => {
  require('dotenv').config({path: envFile});
};

export const getCurrentEnv = (): NodeJS.ProcessEnv => {
  return process.env;
};

export const sourceEnvFile = readEnvFile;