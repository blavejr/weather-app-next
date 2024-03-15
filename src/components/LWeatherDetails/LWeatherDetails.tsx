import React from 'react'
import cx from 'classnames';
import styles from './LWeatherDetails.module.scss';
import Image from 'next/image';
import { ILocationDetails } from '@/interfaces/location';
import { IWeatherData } from '@/interfaces/weather';

interface DetailsCompProps {
    locationDets: ILocationDetails;
    weatherData: IWeatherData;
}

export default function LWeatherDetails({ locationDets, weatherData }: DetailsCompProps):React.ReactElement {
    return (<div className={styles.placeContainer}>
        <h2 className={cx(styles.placeName)}>{locationDets.name}</h2>
        <p className={cx(styles.placeFullName)}>{locationDets.name}, {locationDets.state}, {locationDets.country}</p>
        <p className={cx(styles.currentTime)}>{new Date().toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        <p className={cx(styles.temperature)}>{Math.round(weatherData.main.temp - 273.15)}°C</p>
        <Image className={cx(styles.image)} src="/cloudy.png" alt="cloud" width={300} height={300} />
    </div>
    );
}
