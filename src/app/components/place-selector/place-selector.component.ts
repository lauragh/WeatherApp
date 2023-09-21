import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import _location from '../../../assets/localidades.json';

@Component({
  selector: 'place-selector',
  templateUrl: './place-selector.component.html',
  styleUrls: ['./place-selector.component.css']
})
export class PlaceSelectorComponent implements OnInit {
  locations: string[] = _location;
  @Output() location = new EventEmitter<string>();

  ngOnInit(): void {
    // this.locations = Object.create(location);
  }

  sendLocation(event: Event) {
    const locationName = (event.target as HTMLInputElement).value;
    this.location.emit(locationName);
  }
  
  
}
