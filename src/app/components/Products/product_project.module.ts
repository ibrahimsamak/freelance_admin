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
import { StoreProductsComponent } from "./store-products/store-products.component";
import { ProductProjectRoutingModule } from "../Products/product_project-routing.module";
import { ProductsService } from "../../shared/services/e-commerce/products.service";
// import { QuickViewComponent } from "../e-commerce/quick-view/quick-view.component";
import { ProductsAddComponent } from "./products-add/products-add.component";
import { PlacesProductComponent } from "./places-product/places-product.component";
import { PlacesProductAddComponent } from "./places-product-add/places-product-add.component";

import { Ng5SliderModule } from "ng5-slider";
import { PlacesAddComponent } from "./places-add/places-add.component";
import { PlacesComponent } from "./places/places.component";
import { ECommerceModule } from "../e-commerce/e-commerce.module";
import { StorePlaceComponent } from "./store-place/store-place.component";
import { StorePlaceAddComponent } from "./store-place-add/store-place-add.component";
import { AgmCoreModule } from "@agm/core";
import { AgmDirectionModule } from "agm-direction"; // agm-direction

@NgModule({
  declarations: [
    StoreProductsComponent,
    ProductsAddComponent,
    PlacesAddComponent,
    PlacesComponent,
    PlacesProductAddComponent,
    PlacesProductComponent,
    StorePlaceComponent,
    StorePlaceAddComponent,
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
    ProductProjectRoutingModule,
    Ng5SliderModule,
    ECommerceModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAvAuahE3FylyGQ7f_TXKRUlY1X66JYGy8",
      libraries: ["places", "drawing", "geometry"],
    }),
    AgmDirectionModule,
  ],
  providers: [ProductsService],
})
export class product_projectModule {}
