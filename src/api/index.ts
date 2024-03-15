import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org",
});

export const get = async (url: string, options: any = null): Promise<any> => {
  const response: AxiosResponse = await api.get(url, options);
  return response;
};

export default {
  get,
};
