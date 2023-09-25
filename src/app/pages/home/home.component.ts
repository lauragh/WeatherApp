import { Component, ElementRef, Input, Output, ViewChild, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { Coordenates } from 'src/app/interfaces/coordenates';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{
  page: string = 'today' || 'week';
  @Input() location: string = '';
  @Input() coordinatesWeek!: Coordenates;
  @Input() permission!: boolean;
  @ViewChild('main') main!: ElementRef;

  constructor(
    private dataService: DataService,
    private renderer2: Renderer2
  ){}


  ngAfterViewInit(): void {
    this.checkTheme();
  }

  ngOnInit(): void {
  }


  getLocation(newLocation: string) {
    this.location = newLocation;
  }

  getPermission(permission: boolean) {
    console.log('recibo permission', permission)
    // this.coordinatesWeek = coords;
  }


  getCoordinates(coords: Coordenates) {
    // console.log('recibo',{coords});
    this.coordinatesWeek = coords;
    // console.log('estan bien', this.coordinatesWeek);
  }

  seeWeather(page: string){
    this.page = page;
  }

  checkTheme(){
    this.dataService.themeG.subscribe((theme: string) => {
      this.applyTheme(theme);
    });
  }
  
  applyTheme(theme: string): void {
    // console.log(theme, 'entro');
    if (theme === 'dark') {
      this.renderer2.removeClass(this.main.nativeElement, 'blue-light');
      this.renderer2.addClass(this.main.nativeElement, 'blue-dark');
    } else {
      this.renderer2.removeClass(this.main.nativeElement, 'blue-dark');
      this.renderer2.addClass(this.main.nativeElement, 'blue-light')
    }
  }
}
