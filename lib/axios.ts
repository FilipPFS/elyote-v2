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

// Validate environment variables
function validateEnvVars() {
  if (!process.env.API_ELYOTE_BASE_URL) {
    throw new Error("API_ELYOTE_BASE_URL environment variable is not set");
  }
  if (!process.env.API_ELYOTE_KEY) {
    throw new Error("API_ELYOTE_KEY environment variable is not set");
  }
}

// Proxy config for production
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
      protocol: fixieUrl.protocol.replace(":", ""),
      host: fixieUrl.hostname,
      port: fixieUrl.port ? parseInt(fixieUrl.port, 10) : 80,
      auth: { username, password },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid FIXIE_URL in production: ${message}`);
  }
}

/* ----------------------------------------------------
   GENERIC CLIENT FACTORY
---------------------------------------------------- */
function createAxiosInstance(
  apiKey: string,
  baseURL: string,
  contentType?: string
): AxiosInstance {
  validateEnvVars();

  const axiosConfig: AxiosConfig = {
    baseURL,
    headers: {
      "api-key": apiKey,
      ...(contentType ? { "Content-Type": contentType } : {}),
    },
    proxy: getProxyConfig(),
  };

  return axios.create(axiosConfig);
}

/* ----------------------------------------------------
   BASE URL
---------------------------------------------------- */
const baseURL = local
  ? process.env.API_ELYOTE_DEV_URL!
  : process.env.API_ELYOTE_BASE_URL!;

/* ----------------------------------------------------
   CLIENTS
---------------------------------------------------- */

// JSON client
export const apiClient = createAxiosInstance(
  process.env.API_ELYOTE_KEY!,
  baseURL,
  "application/json"
);

export const apiParcelClient = createAxiosInstance(
  process.env.API_BV_ELYOTE_KEY!,
  baseURL,
  "application/json"
);

// Multipart client
export const multipartApiClient = createAxiosInstance(
  process.env.API_ELYOTE_KEY!,
  baseURL,
  "multipart/form-data"
);

// Auto-detect content type client
export const contentDetectApiClient = createAxiosInstance(
  process.env.API_ELYOTE_KEY!,
  baseURL
);

/* ----------------------------------------------------
   EXAMPLE: second API with a different key
---------------------------------------------------- */
// export const otherServiceClient = createAxiosInstance(
//   process.env.OTHER_API_KEY!,
//   process.env.OTHER_API_URL!,
//   "application/json"
// );
