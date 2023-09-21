import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Coordenates } from 'src/app/interfaces/coordenates';
import { WeatherWeek } from 'src/app/interfaces/weather-week';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from '../../interfaces/weather';
import { WeatherWeekDetails } from 'src/app/interfaces/weather-week-details';

@Component({
  selector: 'app-weather-week',
  templateUrl: './weather-week.component.html',
  styleUrls: ['./weather-week.component.css']
})
export class WeatherWeekComponent implements OnInit, OnChanges{
  @Input() coordinatesWeek!: Coordenates;
  weatherWeek: WeatherWeek[] = [];
  iconsUrl: string[] = [];
  daysOfWeek: { [key: number]: string } = {
    0 : "Lunes",
    1 : "Martes",
    2 : "Miércoles",
    3 : "Jueves",
    4 : "Viernes",
    5 : "Sábado",
    6 : "Domingo"
  };
  positionWeek: number[] = [];
  weatherWeekDetails: WeatherWeekDetails[] = [];

  ngOnInit(): void {
    this.getWeatherWeek();
    console.log('veo coordenadas en hijo semana',this.coordinatesWeek);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['coordinatesWeek'] && !changes['coordinatesWeek'].firstChange) {
      console.log(this.coordinatesWeek);
    }
  }

  constructor(
    private weatherService: WeatherService
  ){}


  getWeatherWeek(): void{
    const { latitude, longitude } = this.coordinatesWeek;

    this.weatherService.getWeatherWeek(latitude, longitude)
    .subscribe((data: any) => {
      this.weatherWeek = data.list;
      let skipFirst = true; 

      for(let [index, info] of this.weatherWeek.entries()){
        this.getIconWeather(info.weather[0].icon, 'array');
        const newDescription = this.capitalizeFirstLetter(info.weather[0].description);
        info.weather[0].description = newDescription;

        const time = info.dt_txt.split(' ');
        info.dayTime = time[0];
        const numberWeek =  new Date(time[0]).getDay();
        info.dayWeek = this.daysOfWeek[numberWeek];
        info.hour = time[1];
        // console.log(tam, this.weeks.size);
        // console.log(info.dt_txt, info.hour);
        const today = new Date().getDate();

        if ((info.dt_txt.includes('06:') && (info.dt_txt.includes(`${today}`)))) {
          // console.log('coincide');
          skipFirst = false;
        }
        else if (info.dt_txt.includes('06:') || info.dt_txt.includes('18:0')) {
          this.positionWeek.push(index);
          console.log('Se ha añadido', info.hour, index);
        }

      }

      this.getMaxTemp();
    });
  }

  getMaxTemp(){
    let par = false;
    let max, min;

    for (let i = 0; i < this.positionWeek.length - 1; i++) {
      const morning = [];
      const night = [];

      console.log('posi',this.positionWeek[i], 'posifin', this.positionWeek[i + 1]);
  
      console.log('hola',{max});
      console.log({min});

      for (let j = this.positionWeek[i]; j <= this.positionWeek[i + 1]; j++) {
        if(!par){
          morning.push(this.weatherWeek[j].main.temp_max);
          console.log(this.weatherWeek[j].dt_txt, this.weatherWeek[j].main.temp_max);
          max = Math.max(...morning);
          min = Math.min(...morning);
          par = true;
        }
        else{
            night.push(this.weatherWeek[j].main.temp_max);
            console.log(this.weatherWeek[j].dt_txt, this.weatherWeek[j].main.temp_max);
            par = false;
        }
      }
    }
  }


  getIconWeather(name: string, object?: string): void{
    if(object){
      this.iconsUrl.push(`https://openweathermap.org/img/wn/${name}@2x.png`);
    }
    else{
      // this.iconUrl = `https://openweathermap.org/img/wn/${name}@2x.png`;
    }
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  


}
