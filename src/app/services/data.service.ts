import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {
  private theme = new BehaviorSubject<string>('light');
  private location = new BehaviorSubject<boolean>(false);

  get themeG(){
    return this.theme.asObservable();
  }

  get locationG(){
    return this.location.asObservable();
  }

  setTheme(theme: string){
    this.theme.next(theme);
  }

  setLocation(permission: boolean){
    this.location.next(permission);
  }
}
