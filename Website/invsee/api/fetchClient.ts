import axios from "axios";

const developmentHostname = "http://localhost:9090/honego/v1";

// TODO: LATER
const productionHostname = "";

/**
 * Base URL for the API client.
 * @default "http://localhost:9090/honego/v1" (development)
 * When the app is released, the second parameter (productionHostname) will be the actual API address.
 * Current value: {@link developmentHostname} in development or {@link productionHostname} in production.
 */
const ApiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? developmentHostname
      : productionHostname,
});

export default ApiClient;
