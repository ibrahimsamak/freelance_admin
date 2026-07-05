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
import { CKEditorModule } from "ngx-ckeditor";
import { GalleryModule } from "@ks89/angular-modal-gallery";
import { NotificationRoutingModule } from "../notifications/notifications-routing.module";
import { ProductsService } from "../../shared/services/e-commerce/products.service";
// import { QuickViewComponent } from "../e-commerce/quick-view/quick-view.component";
// import { PriceComponent } from "../e-commerce/colection/filter/price/price.component";
// import { PriceComponent } from "./colection/filter/price/price.component";
import { Ng5SliderModule } from "ng5-slider";
import { NotifcationsListComponent } from "./notifcations-list/notifcations-list.component";
import { NotificationsAddComponent } from "./notifications-add/notifications-add.component";
import { StoreMessagesComponent } from './store-messages/store-messages.component';
import { NotificationInComponent } from './notification-in/notification-in.component';

@NgModule({
  declarations: [
    // PriceComponent,
    NotifcationsListComponent,
    NotificationsAddComponent,
    StoreMessagesComponent,
    NotificationInComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    ChartsModule,
    CountToModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
    NgxDatatableModule,
    CKEditorModule,
    GalleryModule.forRoot(),
    NotificationRoutingModule,
    Ng5SliderModule,
  ],
  providers: [ProductsService],
})
export class NotificationsModule {}
