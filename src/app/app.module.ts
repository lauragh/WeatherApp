import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceSelectorComponent } from './components/place-selector/place-selector.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { WeatherTodayComponent } from './pages/weather-today/weather-today.component';
import { WeatherWeekComponent } from './pages/weather-week/weather-week.component';
import { HomeComponent } from './pages/home/home.component';
import { WeatherService } from './services/weather.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    PlaceSelectorComponent,
    ThemeSelectorComponent,
    WeatherTodayComponent,
    WeatherWeekComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    WeatherService,
    DataService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
