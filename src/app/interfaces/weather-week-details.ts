export interface WeatherWeekDetails {
    day: Temperature,
    night: Temperature,
    icon: string,
    pop: number
    dayWeek: string
}


interface Temperature {
    max: number,
    min: number
}