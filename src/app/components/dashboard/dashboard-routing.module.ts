import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefaultComponent } from "./default/default.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "default",
        component: DefaultComponent,
        data: {
          title: "",
          breadcrumb: "",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
