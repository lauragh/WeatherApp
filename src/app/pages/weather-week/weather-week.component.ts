import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Coordenates } from 'src/app/interfaces/coordenates';
import { WeatherWeek } from 'src/app/interfaces/weather-week';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-week',
  templateUrl: './weather-week.component.html',
  styleUrls: ['./weather-week.component.css']
})
export class WeatherWeekComponent implements OnInit, OnChanges{
  @Input() coordinatesWeek!: Coordenates;
  weatherWeek: WeatherWeek[] = [];
  iconsUrl: string[] = [];
  weatherDetails?: WeatherWeek;

  ngOnInit(): void {
    this.getWeatherWeek();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['coordinatesWeek'] && !changes['coordinatesWeek'].firstChange) {
      this.getWeatherWeek();
    }
  }

  constructor(
    private weatherService: WeatherService
  ){}

  //Obtiene el tiempo semanal
  getWeatherWeek(): void{
    const { latitude, longitude } = this.coordinatesWeek;

    this.weatherService.getWeatherWeek(latitude, longitude)
    .subscribe((data: any) => {
      console
      this.weatherWeek = data.daily;

      console.log(this.weatherWeek);
      for(let info of this.weatherWeek){
        info.dayDate = this.convertDate(info.dt);
        info.iconImg = this.getIconWeather(info.weather[0].icon);
        info.weather[0].description = this.capitalizeFirstLetter(info.weather[0].description);
      }
    });
  }

  //Convierte el tiempo(epoch) a string con el tiempo local
  //Ej. mié 27 / miércoles, 27 de septiembre de 2023  
  convertDate(epoch: number, format?: string): string{
    const date = new Date(epoch * 1000);

    if(format){
      return date.toLocaleDateString('es-ES',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });  
    }
      return date.toLocaleDateString('es-ES',{
        weekday: 'short',
        day: 'numeric'
      });  

  }

  getIconWeather(name: string): string{
    return `https://openweathermap.org/img/wn/${name}@2x.png`;
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  //Obtiene los datos de la tarjeta clickada
  showDetails(data: WeatherWeek): void {
    data.date = this.convertDate(data.dt, 'long')
    this.weatherDetails = data;
  }


}
