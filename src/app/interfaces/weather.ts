import { WeatherDescription } from "./weather-description";

export interface Weather {
    base: string
    clouds: {
        all: number
    },
    cood: number,
    coord: Coord,
    dt: number,
    id: number,
    main: Main,
    name: string,
    sys: Sys,
    timezone: number,
    visibility: number,
    weather: WeatherDescription[],
    wind: WindSpeed
}


interface Coord {
    lon: number,
    lat: number
}

interface Main {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number 
}

interface Sys {
    country: string,
    id: number,
    sunrise: number | string,
    sunset: number | string,
    type: number
}

interface WindSpeed {
    deg: number,
    speed: number
}