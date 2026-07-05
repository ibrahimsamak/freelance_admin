import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { appConstant } from "../../service/appConstant";
import { OrderMapComponent } from "./order-map/order-map.component";
import { UncovarateMapComponent } from "./uncovarate-map/uncovarate-map.component";
import { AdminGuard } from "../../shared/guard/admin.guard";
import { DriversMapComponent } from "./drivers-map/drivers-map.component";

const routes: Routes = [
  {
    path: "",
    children: [
  
 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule {}
