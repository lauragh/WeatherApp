export class WeatherWeekDetailsClass {
    day: Temperature;
    night: Temperature;
    icon: string;
    pop: number;
    dayWeek: string;
    dayTime: Date;
  
    constructor() {
      this.day = { max: 0, min: 0 };
      this.night = { max: 0, min: 0 };
      this.icon = '';
      this.pop = 0;
      this.dayWeek = '';
      this.dayTime = new Date();
    }
}
  
interface Temperature {
max: number;
min: number;
}