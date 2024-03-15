import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import LWeatherDetails from './LWeatherDetails';

const mockLocationDetails = {
  name: 'Example City',
  state: 'Example State',
  country: 'Example Country',
};

const mockWeatherData = {
  main: {
    temp: 300,
  },
  dt: 1710774000,
  weather: [{
    description: 'A sunny day',
  }],
};

describe('LWeatherDetails component', () => {
  it('renders location details and weather data correctly', () => {
    const { getByText, getByAltText } = render(
      <LWeatherDetails locationDets={mockLocationDetails} weatherData={mockWeatherData} />
    );

    expect(getByText(mockLocationDetails.name)).toBeInTheDocument();
    expect(getByText(`${mockLocationDetails.name}, ${mockLocationDetails.state}, ${mockLocationDetails.country}`)).toBeInTheDocument();
    
    expect(getByText(new Date().toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))).toBeInTheDocument();

    expect(getByText(`${Math.round(mockWeatherData.main.temp - 273.15)}°C`)).toBeInTheDocument();

    expect(getByAltText('cloud')).toBeInTheDocument();
  });
});
