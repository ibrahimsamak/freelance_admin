import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { LoaderComponent } from "./components/loader/loader.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ContentLayoutComponent } from "./components/layout/content-layout/content-layout.component";
import { FullLayoutComponent } from "./components/layout/full-layout/full-layout.component";
import { FeatherIconsComponent } from "./components/feather-icons/feather-icons.component";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { RightSidebarComponent } from "./components/right-sidebar/right-sidebar.component";
import { BookmarkComponent } from "./components/bookmark/bookmark.component";
import { TranslateModule } from "@ngx-translate/core";
import { CustomizerComponent } from "./components/customizer/customizer.component";
import { OrderDetailsPoPComponent } from "../shared/components/order-details/order-details.component";
import { PriceComponent } from "../shared/components/price/price.component";
import { QuickViewComponent } from "../shared/components/quick-view/quick-view.component";
import { DragulaModule } from "ng2-dragula";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GalleryModule } from "@ks89/angular-modal-gallery";
import "hammerjs";
import "mousetrap";
import { Ng5SliderModule } from "ng5-slider";

// services
import { NavService } from "./services/nav.service";
import { ChatService } from "./services/chat.service";
import { CustomizerService } from "./services/customizer.service";
// Directives
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { AgmCoreModule } from "@agm/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { AgmDirectionModule } from "agm-direction"; // agm-direction

@NgModule({
  declarations: [
    OrderDetailsPoPComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BookmarkComponent,
    RightSidebarComponent,
    ContentLayoutComponent,
    FullLayoutComponent,
    FeatherIconsComponent,
    ToggleFullscreenDirective,
    BreadcrumbComponent,
    CustomizerComponent,
    QuickViewComponent,
    PriceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    DragulaModule.forRoot(),
    NgbModule,
    GalleryModule.forRoot(),
    Ng5SliderModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAvAuahE3FylyGQ7f_TXKRUlY1X66JYGy8",
      libraries: ["places", "drawing", "geometry"],
    }),
    NgSelectModule,
    AgmDirectionModule,
  ],
  exports: [
    LoaderComponent,
    FeatherIconsComponent,
    TranslateModule,
    NgSelectModule,
    OrderDetailsPoPComponent,
    QuickViewComponent,
    PriceComponent,
  ],
  providers: [NavService, ChatService, CustomizerService],
})
export class SharedModule {}
