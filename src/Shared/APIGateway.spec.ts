import ApiGateway from "./ApiGateway";
import { API_BASE } from "./config";

global.fetch = jest.fn();

describe("ApiGateway", () => {
  let apiGateway: ApiGateway;

  beforeEach(() => {
    apiGateway = new ApiGateway();
    jest.clearAllMocks();
  });

  it("should make a GET request and return the response data", async () => {
    const mockData = { id: 1, name: "Test Data" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await apiGateway.get("/test");

    expect(fetch).toHaveBeenCalledWith(`${API_BASE}/test`);
    expect(result).toEqual(mockData);
  });

  it("should make a POST request with payload and return the response data", async () => {
    const mockData = { success: true };
    const payload = { name: "New Data" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await apiGateway.post("/test", payload);

    expect(fetch).toHaveBeenCalledWith(`${API_BASE}/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    expect(result).toEqual(mockData);
  });
});
