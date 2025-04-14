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

interface AxiosConfig {
  baseURL: string;
  headers: {
    "Content-Type": string;
    "api-key": string;
  };
  proxy?: ProxyConfig;
}

// Function to create and configure the Axios instance
function createAxiosInstance(): AxiosInstance {
  // Validate environment variables
  if (!process.env.API_ELYOTE_BASE_URL) {
    throw new Error("API_ELYOTE_BASE_URL environment variable is not set");
  }
  if (!process.env.API_ELYOTE_KEY) {
    throw new Error("API_ELYOTE_KEY environment variable is not set");
  }

  // Initialize Axios config object
  const axiosConfig: AxiosConfig = {
    baseURL: process.env.API_ELYOTE_BASE_URL, // e.g., 'https://api.example.com'
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.API_ELYOTE_KEY,
    },
  };

  // Apply proxy config only in production
  if (process.env.NODE_ENV === "production") {
    if (!process.env.FIXIE_URL) {
      throw new Error(
        "FIXIE_URL environment variable is not set in production"
      );
    }

    // Parse FIXIE_URL
    let proxyConfig: ProxyConfig;
    try {
      const fixieUrl = new URL(process.env.FIXIE_URL);
      const username = fixieUrl.username;
      const password = fixieUrl.password;

      if (!username || !password) {
        throw new Error("FIXIE_URL is missing username or password");
      }

      proxyConfig = {
        protocol: fixieUrl.protocol.replace(":", ""), // 'http' or 'https'
        host: fixieUrl.hostname,
        port: fixieUrl.port ? parseInt(fixieUrl.port, 10) : 80, // Default to 80 if no port
        auth: {
          username,
          password,
        },
      };

      axiosConfig.proxy = proxyConfig;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Invalid FIXIE_URL in production: ${errorMessage}`);
    }
  }

  // Create Axios instance with configuration
  const instance = axios.create(axiosConfig);

  console.log("TEST", process.env.NODE_ENV);

  return instance;
}

// Export a singleton instance
export const apiClient = createAxiosInstance();
