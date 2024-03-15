import React from 'react'
import styles from './LForcastDetails.module.scss'
import { IWeatherData } from '@/interfaces/weather';
import cx from 'classnames';

interface IForcastDetailsProps {
    forcastData: Array<IWeatherData>
}

export default function LForcastDetails({ forcastData }: IForcastDetailsProps) {
    return (
        <div className={styles.forcastContainer}>
            {forcastData.map((data, index) => {
                return (
                    <div className={cx(styles.forcastCard)}>
                        <p className={styles.forcastDate}>{new Date(data.dt * 1000).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                        <h3 className={styles.forcastTemperature}>{data.main.temp} °C</h3>
                        <p className={styles.forcastDescription}>{data.weather[0].description}</p>
                    </div>
                );
            })}
        </div>
    )
}
