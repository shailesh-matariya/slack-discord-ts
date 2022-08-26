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
    console.log(config);

    let url = window.location.href;
    url = url.replace(
      "http://localhost:3001",
      "http://slack.cloudcraftsmanship.io"
    );
    if (config.url && config.url.indexOf("?") > -1) {
      // console.log(config.url.indexOf("?"));
      config.url = `${config.url}&url=${url}`;
      console.log(config.url);
    } else config.url = `${config.url}?url=${url}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
