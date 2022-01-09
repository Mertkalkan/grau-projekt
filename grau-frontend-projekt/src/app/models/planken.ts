export interface Planken {
  location:              string;
  "time of measurement": string;
  weekday:               string;
  "pedestrians count":   string;
  "temperature in C":   string;
  "weather condition":   string;
  incidents?:            string;
}

export enum Incidents {
  Laserausfall = <any>"Laserausfall",
}

export enum Location {
  PlankenMitteMannheim = <any>"Planken (Mitte), Mannheim",
}

export enum WeatherCondition {
  ClearDay = <any>"clear-day",
  ClearNight = <any>"clear-night",
  Cloudy = <any>"cloudy",
  Fog = <any>"fog",
  PartlyCloudyDay = <any>"partly-cloudy-day",
  PartlyCloudyNight = <any>"partly-cloudy-night",
  Rain = <any>"rain",
  Snow = <any>"snow",
  Wind = <any>"wind",
}

export enum Weekday {
  Friday = <any>"Friday",
  Monday = <any>"Monday",
  Saturday = <any>"Saturday",
  Sunday = <any>"Sunday",
  Thursday = <any>"Thursday",
  Tuesday = <any>"Tuesday",
  Wednesday = <any>"Wednesday",
}
