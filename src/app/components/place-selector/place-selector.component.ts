import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import _location from '../../../assets/localidades.json';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'place-selector',
  templateUrl: './place-selector.component.html',
  styleUrls: ['./place-selector.component.css']
})
export class PlaceSelectorComponent implements OnInit {
  locations: string[] = _location;
  @Output() location = new EventEmitter<string>();
  perm: boolean = false;
  searches: number = 0;

  ngOnInit(): void {
  }

  constructor(
    private dataService: DataService,
  ){}

  sendLocation(event: Event) {
    if(this.searches < 1){
      this.searches++;
      const locationName = (event.target as HTMLInputElement).value;
      this.location.emit(locationName);
    }
    else{
      this.createAdvise();
    }
  }

  createAdvise(){
    const message = document.createElement("div");
    message.style.position = "absolute";
    message.style.top = "50%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%)";
    message.style.padding = "40px";
    message.style.background = "white";
    message.style.borderRadius = "5px";
    message.style.zIndex = "1";

    const text = document.createElement("h4");
    text.innerText = "Has alcanzado el límite gratuito de 5 búsquedas.";
    text.style.color = "black"; 
    message.appendChild(text);
    
    const updateText = document.createElement("h5");
    updateText.innerText = "Por favor, actualiza tu suscripción a premium";
    updateText.style.color = "black";
    updateText.className = 'd-flex justify-content-center';

    message.appendChild(updateText);

    const div = document.createElement("div");
    div.className = 'd-flex justify-content-center';

    message.appendChild(div);

    const boton = document.createElement("button");
    boton.className = 'mt-2 btn btn-primary';
    boton.innerHTML = 'Actualizar suscripción';

    div.appendChild(boton);

    document.body.appendChild(message);

    boton.addEventListener("click", function() {
      message.removeChild(text);
      message.removeChild(updateText);
      div.removeChild(boton);
    
      // Agrega un nuevo mensaje de "Suscripción actualizada"
      const updatedText = document.createElement("h4");
      updatedText.innerText = "Suscripción actualizada";
      updatedText.style.color = "black";
      message.appendChild(updatedText);
    
      setTimeout(() => {
        message.remove();
      }, 2000);
    });

    this.searches = 0;
  }

  getLocation(){
    const location_timeout = setTimeout("geolocFail()", 10000);

    navigator.geolocation.getCurrentPosition((position) => {
      clearTimeout(location_timeout);

      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      console.log('entro', lat, lon);
      
      localStorage.setItem('lat',`${lat}`);
      localStorage.setItem('lon',`${lon}`);

      this.dataService.setLocation(true);

      }, function(error) {
          clearTimeout(location_timeout);
      }
    );
  }
  
  
  
}
