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

// Function to create and configure the Axios instance
function createAxiosInstance(): AxiosInstance {
  // Validate environment variables
  if (!process.env.FIXIE_URL) {
    throw new Error("FIXIE_URL environment variable is not set");
  }
  if (!process.env.API_ELYOTE_BASE_URL) {
    throw new Error("base_url environment variable is not set");
  }
  if (!process.env.API_ELYOTE_KEY) {
    throw new Error("api_key environment variable is not set");
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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid FIXIE_URL: ${errorMessage}`);
  }

  // Create Axios instance with default configuration
  const instance = axios.create({
    baseURL: process.env.API_ELYOTE_BASE_URL, // e.g., 'https://api.example.com'
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.API_ELYOTE_KEY,
    },
    proxy: proxyConfig,
  });

  return instance;
}

// Export a singleton instance
export const apiClient = createAxiosInstance();
