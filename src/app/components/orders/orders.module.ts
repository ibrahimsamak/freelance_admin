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
import { OrdersRoutingModule } from "../orders/orders-routing.module";
import { ProductsService } from "../../shared/services/e-commerce/products.service";
// import { QuickViewComponent } from "../e-commerce/quick-view/quick-view.component";
// import { PriceComponent } from "../e-commerce/colection/filter/price/price.component";
// import { PriceComponent } from "./colection/filter/price/price.component";
import { Ng5SliderModule } from "ng5-slider";
import { OrdersComponent } from "./orders/orders.component";
import { EarningComponent } from "./earning/earning.component";
// import { OrderDetailsPoPComponent } from "./order-details/order-details.component";
import { CommentsComponent } from "./comments/comments.component";
import { ECommerceModule } from "../e-commerce/e-commerce.module";
import { NewOrderComponent } from './new-order/new-order.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CommentsEmployeeComponent } from './comments-employee/comments-employee.component';

@NgModule({
  declarations: [
    // QuickViewComponent,
    // PriceComponent,
    OrdersComponent,
    EarningComponent,
    // OrderDetailsPoPComponent,
    CommentsComponent,
    NewOrderComponent,
    TransactionsComponent,
    CommentsEmployeeComponent,
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
    OrdersRoutingModule,
    Ng5SliderModule,
    ECommerceModule,
    SharedModule,
  ],
  providers: [ProductsService],
})
export class OrdersModule {}
