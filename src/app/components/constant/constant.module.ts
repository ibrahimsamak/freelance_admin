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
import { ConstantRoutingModule } from "../constant/constant-routing.module";
import { GeneralSettingComponent } from "../constant/general-setting/general-setting.component";
import { ComplaintsComponent } from "./complaints/complaints.component";
import { StaticPageComponent } from "./static-page/static-page.component";
import { SocialMediaComponent } from "./social-media/social-media.component";
import { ReasonsComponent } from "./reasons/reasons.component";
import { CKEditorModule } from "ngx-ckeditor";
import { WelcomeComponent } from "./welcome/welcome.component";
import { GalleryModule } from "@ks89/angular-modal-gallery";
import { AdvsComponent } from "./adv/adv.component";
import { CategoryComponent } from "./category/category.component";
import { CountyComponent } from "./county/county.component";
import { SubCategoryComponent } from "./subcategory/subcategory.component";
import { CityComponent } from "./city/city.component";

@NgModule({
  declarations: [
    GeneralSettingComponent,
    ComplaintsComponent,
    StaticPageComponent,
    SocialMediaComponent,
    ReasonsComponent,
    WelcomeComponent,
    AdvsComponent,
    CategoryComponent,
    CountyComponent,
    SubCategoryComponent,
    CityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    ChartsModule,
    CountToModule,
    ConstantRoutingModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
    NgxDatatableModule,
    CKEditorModule,
    GalleryModule.forRoot(),
  ],
})
export class ConstantModule {}
