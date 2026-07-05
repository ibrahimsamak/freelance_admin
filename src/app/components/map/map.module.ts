import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { GoogleMapComponent } from './google-map/google-map.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [GoogleMapComponent, LeafletMapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvAuahE3FylyGQ7f_TXKRUlY1X66JYGy8'
    }),
    LeafletModule.forRoot(),
    HttpClientModule
  ]
})
export class MapModule { }
