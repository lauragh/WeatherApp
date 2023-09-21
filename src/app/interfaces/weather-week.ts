import { WeatherDescription } from "./weather-description";

export interface WeatherWeek {
    dt: number,
    main: Main,
    clouds: {
        all: number
    },
    weather: WeatherDescription[],
    wind: Wind
    visibility: number,
    pop: number,
    sys: {
        pod: string
    }
    dt_txt: string,
    dayTime?: string,
    dayWeek?: string,
    hour?: string
}

interface Main {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number ,
    sea_level: number,
    grnd_level: number,
    temp_kf: number
}

interface Wind {
    speed: number,
    deg: number,
    gust: number
}