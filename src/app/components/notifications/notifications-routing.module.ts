import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { appConstant } from "src/app/service/appConstant";
import { AdminGuard } from "src/app/shared/guard/admin.guard";
import { GeneralSettingComponent } from "../constant/general-setting/general-setting.component";
import { NotifcationsListComponent } from "./notifcations-list/notifcations-list.component";
import { NotificationsAddComponent } from "./notifications-add/notifications-add.component";
import { StoreMessagesComponent } from "./store-messages/store-messages.component";
import { NotificationInComponent } from "./notification-in/notification-in.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "add",
        component: NotificationsAddComponent,
        canActivate: [AdminGuard],
        data: {
          // title: "الرسائل والاشعارات",
          // breadcrumb: "ارسال تنبيه",
          roles: [appConstant.ADMIN_URL_ID.NOTIFICATIONS_ADD],
        },
      },
      {
        path: "notifications",
        component: NotifcationsListComponent,
        canActivate: [AdminGuard],
        data: {
          // title: "الرسائل والاشعارات",
          // breadcrumb: "التنبيهات الواردة",
          roles: [appConstant.ADMIN_URL_ID.NOTIFICATIONS],
        },
      },
      {
        path: "notifications2",
        component: NotificationInComponent,
        canActivate: [AdminGuard],
        data: {
          // title: "الرسائل والاشعارات",
          // breadcrumb: "التنبيهات الواردة",
          roles: [appConstant.ADMIN_URL_ID.NOTIFICATIONS],
        },
      },
      // {
      //   path: "messages",
      //   component: StoreMessagesComponent,
      //   canActivate: [AdminGuard],
      //   data: {
      //     title: "الرسائل والاشعارات",
      //     breadcrumb: "الرسائل الواردة",
      //     roles: [appConstant.ADMIN_URL_ID.MYMESSAGES],
      //   },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
