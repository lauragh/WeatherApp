import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.css']
})
export class ThemeSelectorComponent implements OnInit{
  @ViewChild('switch') switch!: ElementRef;

  ngOnInit(): void {
  }
  

  constructor(
    private dataService: DataService
  ){}

  setTheme(){
    if(!this.switch.nativeElement.checked){
      this.dataService.setTheme('light');
    }
    else{
      this.dataService.setTheme('dark');
    }
  }

}
