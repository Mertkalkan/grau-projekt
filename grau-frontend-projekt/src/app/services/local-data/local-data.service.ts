import { Injectable } from '@angular/core';
import { Planken } from 'src/app/models/planken';
import plankenMitte from 'src/assets/plankenMitte.json'
import mavi001 from 'src/assets/mavi001_data.json'
import mavi002 from 'src/assets/mavi002_data.json'
import { Traffic } from 'src/app/models/traffic';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor() { }

  getPlankenMitteData(): Planken[]{
    return plankenMitte
  }

  getMavi1(): Traffic{
    return mavi001
  }
  
  getMavi2(): Traffic{
    return mavi002
  }
}
