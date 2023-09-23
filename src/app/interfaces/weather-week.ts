import { WeatherDescription } from "./weather-description";

export interface WeatherWeek {
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    moon_phase: number,
    temp: Temperature,
    feels_like: TemperatureResume,
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: WeatherDescription[],
    clouds: number,
    pop: number,
    rain: number,
    uvi: number,
    dayDate?: string,
    iconImg?: string
    date: string,
}

interface Temperature {
    day: number,
    night: number,
    eve: number,
    morn: number
    min: number,
    max: number,
}

interface TemperatureResume {
    day: number,
    night: number,
    eve: number,
    morn: number
}

