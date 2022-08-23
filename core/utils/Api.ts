import axios from "axios";

// export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_URL = "https://slack-api.cloudcraftsmanship.io/api";
export const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/** Error Handling */
httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const { response = {} } = err;
    const { data = {}, status } = response;
    const { message: apiMessage } = data;

    switch (status) {
      case 400:
        console.error(apiMessage);
        break;
      case 401:
        throw new Error(apiMessage);
      case 500:
        console.error("Internal Server Error");
        break;
      case 502:
        console.error("Bad Gateway");
        break;
      case 503:
        console.error("Service Unavailable");
        break;
      default:
        console.error(apiMessage);
        break;
    }

    return Promise.reject(err);
  }
);

httpClient.interceptors.request.use(
  (config) => {
    config.url = `${config.url}?url=${window.location.href}`;
    // console.log("config", config.url);

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
