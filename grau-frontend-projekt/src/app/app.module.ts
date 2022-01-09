import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerkehrChartComponent } from './modules/verkehr-chart/verkehr-chart.component';
import { FussgaengerChartComponent } from './modules/fussgaenger-chart/fussgaenger-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { CovidFaelleChartComponent } from './modules/covid-faelle-chart/covid-faelle-chart.component';
import { LocalDataService } from './services/local-data/local-data.service';
import { MatToolbarModule } from '@angular/material/ToolBar';
import { MatButtonModule } from '@angular/material/Button';
import { MatRadioModule } from '@angular/material/Radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ApiService } from './services/api/api.service';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    VerkehrChartComponent,
    FussgaengerChartComponent,
    CovidFaelleChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatSlideToggleModule,
    FormsModule ,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [LocalDataService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
