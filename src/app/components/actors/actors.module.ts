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
import { ClientsComponent } from "./clients/clients.component";
import { ClientDetailsComponent } from "./client-details/client-details.component";
import { ProvidersComponent } from "./providers/providers.component";
import { ProvidersDetailsComponent } from "./providers-details/providers-details.component";
// import { OrderDetailsPoPComponent } from "../orders/order-details/order-details.component";
import { AdminsComponent } from "./admins/admins.component";
import { AdminDetailsComponent } from "./admin-details/admin-details.component";
import { OrdersModule } from "../orders/orders.module";
import { AdminProfileComponent } from "./admin-profile/admin-profile.component";
import { AgmCoreModule } from "@agm/core";
import { EmployeesComponent } from "./employees/employees.component";
import { EmployeesDetailsComponent } from "./employees-details/employees-details.component";
import { AgmDirectionModule } from "agm-direction";
import { SupervisorComponent } from './supervisor/supervisor.component';
import { SupervisorDetailsComponent } from './supervisor-details/supervisor-details.component'; // agm-direction

@NgModule({
  declarations: [
    // OrderDetailsPoPComponent,
    ClientsComponent,
    ClientDetailsComponent,
    ProvidersComponent,
    ProvidersDetailsComponent,
    AdminsComponent,
    AdminDetailsComponent,
    AdminProfileComponent,
    EmployeesComponent,
    EmployeesDetailsComponent,
    SupervisorComponent,
    SupervisorDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    ChartsModule,
    CountToModule,
    ActorRoutingModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
    NgxDatatableModule,
    CKEditorModule,
    GalleryModule.forRoot(),
    OrdersModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAvAuahE3FylyGQ7f_TXKRUlY1X66JYGy8",
    }),
    AgmDirectionModule,
  ],
})
export class ActorsModule {}
