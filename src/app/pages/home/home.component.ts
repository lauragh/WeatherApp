import { Component, Input, Output } from '@angular/core';
import { Coordenates } from 'src/app/interfaces/coordenates';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  page: string = 'today' || 'week';
  @Input() location: string = '';
  @Output() coordinates!: object;
  @Input() coordinatesWeek!: Coordenates;


  getLocation(newLocation: string) {
    this.location = newLocation;
  }

  getCoordinates(coords: Coordenates) {
    console.log('recibo',{coords});
    this.coordinates = coords;
    this.coordinatesWeek = coords;
    console.log('estan bien', this.coordinatesWeek);
  }

  seeWeather(page: string){
    this.page = page;
  }
  
}
