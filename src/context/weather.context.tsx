"use client";

import { IWeatherData } from "@/interfaces/weather";
import {
    Dispatch,
    FC,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

interface IWeatherContext {
    weatherData: IWeatherData | undefined;
    setWeatherData: Dispatch<SetStateAction<IWeatherData | undefined>>;
}

const contextName: string = "WeatherContext";

const WeatherContext = createContext<IWeatherContext | undefined>(
    undefined
);

export const WeatherContextProvider: FC<{ children: React.ReactNode }> = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [weatherData, setWeatherData] = useState<IWeatherData | undefined>();

    const weatherContextValue: IWeatherContext = {
        weatherData,
        setWeatherData,
    };

    return (
        <WeatherContext.Provider value={weatherContextValue}>
            {children}
        </WeatherContext.Provider>
    );
}

export const useWeatherContext = () => {
    const weatherContext = useContext(WeatherContext);
    if (weatherContext === undefined) {
        throw new Error(`${contextName} must be used within a Provider`);
    }
    return weatherContext;
}


export const setWeatherData = (data: IWeatherData) => {
    const weatherContext = useContext(WeatherContext);
    if (weatherContext === undefined) {
        throw new Error(`${contextName} must be used within a Provider`);
    }
    weatherContext.setWeatherData(data);
}
