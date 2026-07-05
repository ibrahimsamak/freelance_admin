import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { appConstant } from "src/app/service/appConstant";
import { AdminGuard } from "src/app/shared/guard/admin.guard";
import { GeneralSettingComponent } from "../constant/general-setting/general-setting.component";
import { AdminDetailsComponent } from "./admin-details/admin-details.component";
import { AdminProfileComponent } from "./admin-profile/admin-profile.component";
import { AdminsComponent } from "./admins/admins.component";
import { ClientDetailsComponent } from "./client-details/client-details.component";
import { ClientsComponent } from "./clients/clients.component";
import { EmployeesDetailsComponent } from "./employees-details/employees-details.component";
import { EmployeesComponent } from "./employees/employees.component";
import { ProvidersDetailsComponent } from "./providers-details/providers-details.component";
import { ProvidersComponent } from "./providers/providers.component";
import { SupervisorDetailsComponent } from "./supervisor-details/supervisor-details.component";
import { SupervisorComponent } from "./supervisor/supervisor.component";

const routes: Routes = [
  {
    path: "",
    children: [    
      {
        path: "provider",
        component: ProvidersComponent,
        canActivate: [AdminGuard],
        data: {
          // title: "مزودين الخدمات",
          // breadcrumb: "مزودين الخدمات",
          roles: [appConstant.ADMIN_URL_ID.STORES],
        },
      },
      {
        path: "provider/details",
        component: ProvidersDetailsComponent,
        canActivate: [AdminGuard],
        data: {
          // title: "مزودين الخدمات",
          // breadcrumb: "مزودين الخدمات",
          roles: [appConstant.ADMIN_URL_ID.STORES],
        },
      },
      {
        path: "provider/details/:id",
        component: ProvidersDetailsComponent,
        canActivate: [AdminGuard],
        data: {
          // title: "مزودين الخدمات",
          // breadcrumb: "مزودين الخدمات",
          roles: [appConstant.ADMIN_URL_ID.STORES],
        },
      },
      {
        path: "clients",
        component: ClientsComponent,
        canActivate: [AdminGuard],
        data: {
          // title: "العملاء",
          // breadcrumb: "العملاء",
          roles: [appConstant.ADMIN_URL_ID.USER],
        },
      },
      {
        path: "details/:id",
        component: ClientDetailsComponent,
        canActivate: [AdminGuard],
        data: {
          // title: "تفاصيل المستخدم",
          // breadcrumb: "التفاصيل",
          roles: [appConstant.ADMIN_URL_ID.USER],
        },
      },
      {
        path: "admins",
        component: AdminsComponent,
        canActivate: [AdminGuard],
        data: {
          // title: "الادراة",
          // breadcrumb: "الادراة",
          roles: [appConstant.ADMIN_URL_ID.ADMINS],
        },
      },
      {
        path: "admins/details/:id",
        component: AdminDetailsComponent,
        canActivate: [AdminGuard],
        data: {
          // title: "الادراة",
          // breadcrumb: "الادراة",
          roles: [appConstant.ADMIN_URL_ID.ADMINS],
        },
      },
      {
        path: "admins/details",
        component: AdminDetailsComponent,
        canActivate: [AdminGuard],
        data: {
          // title: "الادراة",
          // breadcrumb: "الادراة",
          roles: [appConstant.ADMIN_URL_ID.ADMINS],
        },
      },
      {
        path: "admins/profile/:id",
        component: AdminProfileComponent,
        // canActivate: [AdminGuard],
        data: {
          // title: "الادراة",
          // breadcrumb: "الادراة",
          // roles: [appConstant.ADMIN_URL_ID.MYPROFILE],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActorRoutingModule {}
