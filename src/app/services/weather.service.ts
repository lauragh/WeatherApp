import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey  = '39366819d4e4c9184734c429c9078d5d';

  constructor(private http: HttpClient) { }

  getWeatherFromCity(city: string) {
    //Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    const metrics = 'metric';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=${metrics}&lang=es`;
  
    return this.http.get(apiUrl);
  }

  getWeatherFromCoordinates(lat: number, lon: number) {
    const metrics = 'metric';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${metrics}&lang=es`;
  
    return this.http.get(apiUrl);
  }

  getWeatherHourly(lat: number, lon: number){
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=daily,minutely,current,alerts&units=metric&appid=${this.apiKey}&lang=es`;
    
    return this.http.get(apiUrl);
  }

  getWeatherWeek(lat: number, lon: number){
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}&lang=es`;
    
    return this.http.get(apiUrl);
  }
}
