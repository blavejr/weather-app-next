"use strict";
"use client";

import styles from "./page.module.scss";
import React, { useEffect } from "react";
import {
  getPlaceDetails,
  getWeatherData,
  getWeatherForeCastData,
} from "../api/weather";
import { IWeatherData } from "@/interfaces/weather";
import { useWeatherContext } from "@/context/weather.context";
import { ILocationDetails, IPlace } from "@/interfaces/location";
import LWeatherDetails from "@/components/LWeatherDetails/LWeatherDetails";
import cx from "classnames";
import locationsArray from "@/utils/location";
import LForcastDetails from "@/components/LForcastDetails/LForcastDetails";

export default function Home() {
  // I am using context here just to demonstrate how to use it
  const { weatherData, setWeatherData } = useWeatherContext();
  const [forcastData, setForcastData] = React.useState<Array<IWeatherData>>([]);
  // I am using state here to demonstrate how to use it
  const [locationDets, setLocationDets] =
    React.useState<ILocationDetails | null>(null);
  const [locationIndex, setLocationIndex] = React.useState<number>(0);
  const locations = locationsArray;

  const getLocationData = (location: IPlace) => {
    getPlaceDetails(location, 1).then((data: ILocationDetails) => {
      setLocationDets(data);
    });
    getWeatherData(location).then((data: IWeatherData) => {
      setWeatherData(data);
    });
    getWeatherForeCastData(locations[locationIndex], "metric").then(
      (data: Array<IWeatherData>) => {
        setForcastData(data);
      }
    );
  };

  useEffect(() => {
    getLocationData(locations[0]);
  }, []);

  const handleNextLocation = () => {
    setLocationIndex((prev) => (prev + 1) % locations.length);
    getLocationData(locations[locationIndex]);
  };

  const handlePrevLocation = () => {
    setLocationIndex(
      (prev) => (prev - 1 + locations.length) % locations.length
    );
    getLocationData(locations[locationIndex]);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {weatherData && locationDets ? (
          // Prop drilling here for simplicity but I could use context
          <LWeatherDetails
            locationDets={locationDets}
            weatherData={weatherData}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.buttonsContainer}>
        <div className={cx(styles.button)} onClick={handlePrevLocation}>
          Back
        </div>
        <div className={cx(styles.button)} onClick={handleNextLocation}>
          Next
        </div>
      </div>
      <LForcastDetails forcastData={forcastData} />
    </main>
  );
}
