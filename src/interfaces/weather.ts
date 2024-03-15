export interface IWeatherData {
  main: {
    temp: number;
  };
//   Making them optional to save me some mocking time
  dt: number;
  weather: {
    description: string;
  }[];
}
