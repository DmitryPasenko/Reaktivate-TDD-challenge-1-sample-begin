import { API_BASE } from "../config";

export default class ApiGateway {
  get = async <T>(path: string): Promise<T> => {
    const response = await fetch(`${API_BASE}${path}`);
    return await response.json();
  };

  post = async <T>(path: string, payload: unknown): Promise<T> => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await response.json();
  };
}
