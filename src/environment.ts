import * as fs from "fs";

export const set = (variable: string, value: string): void => {
  process.env[variable] = value;
};

export const readEnvironmentFile = (path: string): void => {
  const fileBuffer = fs.readFileSync(path);
  const parsedBuffer = parseBuffer(fileBuffer);

  parsedBuffer.forEach(({ key, value }) => {
    process.env[key] = value;
  });
};

export const getCurrentEnvironment = (): NodeJS.ProcessEnv => {
  return process.env;
};

export interface EnvironmentPair {
  key: string;
  value: string;
}

export const parseEnvironmentFile = (path: string): EnvironmentPair[] => {
  const file = fs.readFileSync(path);

  return parseBuffer(file);
};

const parseBuffer = (buffer: Buffer): EnvironmentPair[] => {
  const string = buffer.toString();
  const lineEndings = string.includes("\r\n") ? "\r\n" : "\n";

  return string
    .split(lineEndings)
    .filter((line) => {
      return line.trim() !== "" && line.trim() !== lineEndings;
    })
    .map((line) => {
      const [dirtyKey, dirtyValue] = line.split("=");

      if (dirtyKey === undefined || dirtyValue === undefined) {
        throw new Error(`Environment file has non-key-value pair: ${line}`);
      }

      const key = dirtyKey.replace(/^\s*export\s+|^\s+/gu, "");
      const value = dirtyValue.replace(/^\s+|"/gu, "");

      return { key, value };
    });
};
