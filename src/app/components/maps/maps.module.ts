import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartistModule } from "ng-chartist";
import { ChartsModule } from "ng2-charts";
import { CountToModule } from "angular-count-to";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SharedModule } from "../../shared/shared.module";
import { ActorRoutingModule } from "../actors/actors-routing.module";
import { CKEditorModule } from "ngx-ckeditor";
import { GalleryModule } from "@ks89/angular-modal-gallery";
// import { OrderDetailsPoPComponent } from "../orders/order-details/order-details.component";
import { OrdersModule } from "../orders/orders.module";
import { OrderMapComponent } from "./order-map/order-map.component";
import { UncovarateMapComponent } from "./uncovarate-map/uncovarate-map.component";
import { MapsRoutingModule } from "./maps-routing.module";
import { AgmCoreModule } from "@agm/core";
import { AgmDirectionModule } from "agm-direction";
import { DriversMapComponent } from './drivers-map/drivers-map.component'; // agm-direction
import { AngularFireModule, } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [
    // OrderDetailsPoPComponent,
    OrderMapComponent,
    UncovarateMapComponent,
    DriversMapComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    SharedModule,
    NgxDatatableModule,
    CKEditorModule,
    GalleryModule.forRoot(),
    OrdersModule,
    MapsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAvAuahE3FylyGQ7f_TXKRUlY1X66JYGy8",
      libraries: ["places", "drawing", "geometry"],
    }),
    AgmDirectionModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
})
export class MapsModule {}
