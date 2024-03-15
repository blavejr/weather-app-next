import { IWeatherData } from "@/interfaces/weather";
import api from "./index";
import { ILocationDetails, IPlace } from "@/interfaces/location";

// This should be on the backend
const API_KEY = 'b5042659f2b6c3f9d4ea89e203a77d8b'

interface IQueryParams {
  lat?: number;
  lon?: number;
  q?: string;
  limit?: number;
  units?: string;
  appid: string;
}

function buildQueryParams(searchData: IQueryParams): string {
  // remove undefined values
  const filteredEntries = Object.entries(searchData).filter(([_, value]) => value !== undefined);

  const mappedEntries = filteredEntries.map(([key, value]) => {
    if (value instanceof Date) {
      return [key, value.toISOString()];
    } else {
      return [key, encodeURIComponent(String(value))];
    }
  });

  const queryParams = new URLSearchParams(mappedEntries);
  return queryParams.toString();
}

export const getWeatherData = async ({ lat, lon }: IPlace):Promise<IWeatherData> => {
    const queryParams = buildQueryParams({lat, lon, appid: API_KEY});
    const response = await api.get(`/data/2.5/weather?${queryParams}`).catch((error) => {
      console.error("Error fetching weather data:", error);
    });
    return response.data;
};


export const getWeatherForeCastData = async ({ lat, lon }: IPlace, units: string):Promise<Array<IWeatherData>> => {
  const queryParams = buildQueryParams({lat, lon, units, appid: API_KEY});
  const response = await api.get(`/data/2.5/forecast?${queryParams}`).catch((error) => {
    console.error("Error fetching weather data:", error);
  });
  return response.data.list;
};

export const getPlaceDetails = async (place: IPlace, limit: number): Promise<ILocationDetails> => {
  const queryParams = buildQueryParams({lat: place.lat, lon:place.lon, limit , appid: API_KEY});
  
  const response = await api.get(`/geo/1.0/reverse?${queryParams}`).catch((error) => {
    console.error("Error fetching weather data:", error);
  });
  return response.data[0];

}

const weatherAPI = {
  getWeatherData,
};

export default weatherAPI;
