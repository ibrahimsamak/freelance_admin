import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { appConstant } from "src/app/service/appConstant";
import { AdminGuard } from "src/app/shared/guard/admin.guard";
import { GeneralSettingComponent } from "../constant/general-setting/general-setting.component";
import { CouponsComponent } from "./coupons/coupons.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "coupon",
        component: CouponsComponent,
        canActivate: [AdminGuard],
        data: {
          // title: "الكوبونات",
          // breadcrumb: "الكوبونات",
          roles: [appConstant.ADMIN_URL_ID.COUPON],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersRoutingModule {}
