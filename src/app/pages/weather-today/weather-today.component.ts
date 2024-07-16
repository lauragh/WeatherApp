import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from 'src/app/interfaces/weather';
import { WeatherHour } from 'src/app/interfaces/weather-hour';
import { Coordenates } from 'src/app/interfaces/coordenates';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.css']
})
export class WeatherTodayComponent implements OnInit, OnChanges{
  @Input() location!: string;
  @Output() coordinates = new EventEmitter<Coordenates>();
  @ViewChild('todayDetails') todayDetails!: ElementRef;

  weatherInfo!: Weather;
  weatherInfoHourly: WeatherHour[] = [];
  iconUrl: string = '';
  iconsUrl: string[] = [];
  description: string = '';

  ngOnInit(): void {
    this.checkLocation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] && !changes['location'].firstChange) {
      this.getWeatherFromCity(this.location);
    }
  }

  constructor(
    private weatherService: WeatherService,
    private renderer2: Renderer2,
    private dataService: DataService,

  ){}

  //Comprueba si hay datos de la ubicación precisa almacenados
  checkLocation(){
    this.dataService.locationG.subscribe((location: boolean) => {
      if(localStorage.getItem('lat') || location){
        const lat = Number(localStorage.getItem('lat'));
        const lon = Number(localStorage.getItem('lon'));
  
        this.getWeatherFromCoordinates(lat, lon);
        this.getWeatherHourly(lat, lon);
        this.sendCoordinates(lat, lon);

      }
      else{
        this.getCurrentLocation();
      }
    });
  }

  //Envía las coordenadas al tiempo semanal
  sendCoordinates(lat: number, lon: number): void {
    const coordinates = {
      latitude: lat,
      longitude: lon
    }

    this.coordinates.emit(coordinates);
  }

  //Obtiene las coordenadas de nuestro IP
  async getCurrentLocation(): Promise<void>{
    const [ latitude, longitude ] = await this.getUserLocation();
    this.sendCoordinates(latitude, longitude);
    this.getWeatherFromCoordinates(latitude, longitude);
    this.getWeatherHourly(latitude, longitude);
    
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise( (resolve, reject ) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve( [ coords.longitude, coords.latitude ] );
        },
        ( err ) => {
          alert('No se pudo obtener la geolocalización')
          console.log(err);
          reject();
        }
      );
    });
  }

  //Obtiene el tiempo mediante el nombre de la localidad
  getWeatherFromCity(location: string): void{
    this.weatherService.getWeatherFromCity(location)
    .subscribe((data: any) => {
      this.sendCoordinates(data.coord.lat, data.coord.lon);
      this.weatherInfo = data;
      this.description = this.capitalizeFirstLetter(this.weatherInfo.weather[0].description);
      this.weatherInfo.weather[0].description = this.description;
      if (typeof this.weatherInfo.sys.sunrise === 'number') {
        this.weatherInfo.sys.sunrise = this.convertEpoch(this.weatherInfo.sys.sunrise);
      }
      if(typeof this.weatherInfo.sys.sunset === 'number') {
        this.weatherInfo.sys.sunset = this.convertEpoch(this.weatherInfo.sys.sunset);
      }
    });
  }

  //Pone en mayúsculas la primera letra
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  //Obtiene el tiempo mediante coordenadas
  getWeatherFromCoordinates(lat: number, lon: number): void{
    this.weatherService.getWeatherFromCoordinates(lat, lon)
    .subscribe((data: any) => {
      this.getIconWeather(data.weather[0].icon);
      this.weatherInfo = data;
      this.description = this.capitalizeFirstLetter(this.weatherInfo.weather[0].description);
      this.weatherInfo.weather[0].description = this.description;
      if (typeof this.weatherInfo.sys.sunrise === 'number') {
        this.weatherInfo.sys.sunrise = this.convertEpoch(this.weatherInfo.sys.sunrise);
      }
      if(typeof this.weatherInfo.sys.sunset === 'number') {
        this.weatherInfo.sys.sunset = this.convertEpoch(this.weatherInfo.sys.sunset);
      }

    });
  }

  //Obtiene el tiempo por horas
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
    });
  }

  //Convierte el tiempo (epoch) a un string. Ej: 18:00
  convertEpoch(epoch: number): string{
    const date = new Date(epoch * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return time
  }

  //Obtiene los iconos del tiempo
  getIconWeather(name: string, object?: string): void{
    if(object){
      this.iconsUrl.push(`https://openweathermap.org/img/wn/${name}@2x.png`);
    }
    else{
      this.iconUrl = `https://openweathermap.org/img/wn/${name}@2x.png`;
    }
  }
}
