import axios, { AxiosInstance } from "axios";

interface ProxyConfig {
  protocol: string;
  host: string;
  port: number;
  auth: {
    username: string;
    password: string;
  };
}

const local = false;

interface AxiosConfig {
  baseURL: string;
  headers: {
    "Content-Type"?: string;
    "api-key": string;
  };
  proxy?: ProxyConfig;
}

// Shared function to validate environment variables
function validateEnvVars() {
  if (!process.env.API_ELYOTE_BASE_URL) {
    throw new Error("API_ELYOTE_BASE_URL environment variable is not set");
  }
  if (!process.env.API_ELYOTE_KEY) {
    throw new Error("API_ELYOTE_KEY environment variable is not set");
  }
}

// Shared function to get proxy config for production
function getProxyConfig(): ProxyConfig | undefined {
  if (process.env.NODE_ENV !== "production") {
    return undefined;
  }

  if (!process.env.FIXIE_URL) {
    throw new Error("FIXIE_URL environment variable is not set in production");
  }

  try {
    const fixieUrl = new URL(process.env.FIXIE_URL);
    const username = fixieUrl.username;
    const password = fixieUrl.password;

    if (!username || !password) {
      throw new Error("FIXIE_URL is missing username or password");
    }

    return {
      protocol: fixieUrl.protocol.replace(":", ""), // 'http' or 'https'
      host: fixieUrl.hostname,
      port: fixieUrl.port ? parseInt(fixieUrl.port, 10) : 80, // Default to 80 if no port
      auth: {
        username,
        password,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid FIXIE_URL in production: ${errorMessage}`);
  }
}

// Create JSON Axios instance
function createJsonAxiosInstance(): AxiosInstance {
  validateEnvVars();

  const axiosConfig: AxiosConfig = {
    baseURL: local
      ? process.env.API_ELYOTE_DEV_URL!
      : process.env.API_ELYOTE_BASE_URL!, // e.g., 'https://api.example.com'
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.API_ELYOTE_KEY!,
    },
    proxy: getProxyConfig(),
  };

  const instance = axios.create(axiosConfig);
  return instance;
}

// Create Multipart Axios instance
function createMultipartAxiosInstance(): AxiosInstance {
  validateEnvVars();

  const axiosConfig: AxiosConfig = {
    baseURL: local
      ? process.env.API_ELYOTE_DEV_URL!
      : process.env.API_ELYOTE_BASE_URL!, // e.g., 'https://api.example.com'
    headers: {
      "Content-Type": "multipart/form-data",
      "api-key": process.env.API_ELYOTE_KEY!,
    },
    proxy: getProxyConfig(),
  };

  const instance = axios.create(axiosConfig);
  return instance;
}

function createAutoContentAxiosInstance(): AxiosInstance {
  validateEnvVars();

  const axiosConfig: AxiosConfig = {
    baseURL: local
      ? process.env.API_ELYOTE_DEV_URL!
      : process.env.API_ELYOTE_BASE_URL!, // e.g., 'https://api.example.com'
    headers: {
      // "Content-Type": "multipart/form-data", // détection automatique (utile pour l'envoi des fichiers)
      "api-key": process.env.API_ELYOTE_KEY!,
    },
    proxy: getProxyConfig(),
  };

  const instance = axios.create(axiosConfig);
  return instance;
}

// Export both singleton instances
export const apiClient = createJsonAxiosInstance();
export const multipartApiClient = createMultipartAxiosInstance();
export const contentDetectApiClient = createAutoContentAxiosInstance();
