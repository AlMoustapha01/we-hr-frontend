import { env } from "@/config/env";
import qs from "qs";

type Any = string | number | boolean | undefined | null;

export class ApiError extends Error {
  code?: string;
  statusCode?: number;

  constructor(message: string, code?: string, statusCode?: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, Any | Array<Any>>;
  cookie?: string;
  params?: Record<string, Any>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

function buildUrlWithParams(
  url: string,
  params?: RequestOptions["params"]
): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );
  if (Object.keys(filteredParams).length === 0) return url;

  const queryString = qs.stringify(filteredParams, {
    encode: false,
    arrayFormat: "brackets",
  });

  return `${url}?${queryString}`;
}

async function fetchApi<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    cookie,
    params,
    cache = "no-store",
    next,
  } = options;
  const fullUrl = buildUrlWithParams(`${env.API_URL}/api/v1${url}`, params);

  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    cache,
    next,
  });

  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData.message || response.statusText;
    const code = errorData.error || errorData.code;
    throw new ApiError(message, code, response.status);
  }

  return response.json();
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "GET" });
  },
  post<T>(
    url: string,
    body?: Record<string, Any | Array<Any>>,
    options?: RequestOptions
  ): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "POST", body });
  },
  put<T>(
    url: string,
    body?: Record<string, Any | Array<Any>>,
    options?: RequestOptions
  ): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PUT", body });
  },
  patch<T>(
    url: string,
    body?: Record<string, Any | Array<Any>>,
    options?: RequestOptions
  ): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PATCH", body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "DELETE" });
  },
};
