import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from 'src/app/interfaces/weather';
import { WeatherHour } from 'src/app/interfaces/weather-hour';
import { Coordenates } from 'src/app/interfaces/coordenates';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.css']
})
export class WeatherTodayComponent implements OnInit, OnChanges{
  @Input() location!: string;
  @Output() coordinates = new EventEmitter<Coordenates>();

  weatherInfo!: Weather;
  weatherInfoHourly: WeatherHour[] = [];
  iconUrl: string = '';
  iconsUrl: string[] = [];

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] && !changes['location'].firstChange) {
      this.getWeatherFromCity(this.location);
    }
  }

  constructor(
    private weatherService: WeatherService
  ){}


  sendCoordinates(lat: number, lon: number): void {
    const coordinates = {
      latitude: lat,
      longitude: lon
    }

    // console.log('envio a padre',{coordinates});
    this.coordinates.emit(coordinates);
  }


  getCurrentLocation(): void{
    this.weatherService.getIpCliente()
    .subscribe((data: any) => {
      this.sendCoordinates(data.latitude, data.longitude);
      this.getWeatherFromCoordinates(data.latitude, data.longitude);
      this.getWeatherHourly(data.latitude, data.longitude);
    });
  }

  getWeatherFromCity(location: string): void{
    this.weatherService.getWeatherFromCity(location)
    .subscribe((data: any) => {
      this.sendCoordinates(data.coord.lat, data.coord.lon);
      this.weatherInfo = data;
      const newDescription = this.capitalizeFirstLetter(this.weatherInfo.weather[0].description);
      this.weatherInfo.weather[0].description = newDescription;

      // console.log(this.weatherInfo);
    });
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }


  getWeatherFromCoordinates(lat: number, lon: number): void{
    this.weatherService.getWeatherFromCoordinates(lat, lon)
    .subscribe((data: any) => {
      this.getIconWeather(data.weather[0].icon);
      this.weatherInfo = data;
      const newDescription = this.capitalizeFirstLetter(this.weatherInfo.weather[0].description);
      this.weatherInfo.weather[0].description = newDescription;
      // console.log(this.weatherInfo);
    });
  }

  getWeatherHourly(lat: number, lon: number): void{
    this.weatherService.getWeatherHourly(lat, lon)
    .subscribe((data: any) => {
      this.weatherInfoHourly =  data.hourly.slice(1, 25);
      for(let info of this.weatherInfoHourly){
        this.getIconWeather(info.weather[0].icon, 'array');
        const newDescription = this.capitalizeFirstLetter(info.weather[0].description);

        if (typeof info.dt === 'number') {
          info.dt = this.convertEpoch(info.dt);
        }
        info.weather[0].description = newDescription;
      }
      // console.log(data, this.weatherInfoHourly);
    });
  }

  convertEpoch(epoch: number): string{
    const date = new Date(epoch * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return time
  }

  getIconWeather(name: string, object?: string): void{
    if(object){
      this.iconsUrl.push(`https://openweathermap.org/img/wn/${name}@2x.png`);
    }
    else{
      this.iconUrl = `https://openweathermap.org/img/wn/${name}@2x.png`;
    }
  }
  

}
