import { Component, OnInit } from "@angular/core";
import { appConstant, UserType } from "src/app/service/appConstant";
import { ConstantServiceWrapper } from "../../../service/ConstantServiceWrapper.service";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { MomentDateFormatter } from "../../../service/utils_function";
import { ar } from "date-fns/locale";
declare var require;
const Swal = require("sweetalert2");
import * as jsonexport from "jsonexport/dist";

@Component({
  selector: "app-earning",
  templateUrl: "./earning.component.html",
  styleUrls: ["./earning.component.scss"],
})
export class EarningComponent implements OnInit {
  momentFormat = new MomentDateFormatter();
  reaseon = "";
  orderDetails = {};
  searchObject = {
    dt_from: "",
    dt_to: "",
    status: 'finished',
    supplier_id: "",
    place_id:""
  };
  orders = [];
  stores = [];
  places = [];
  providers = [];

  page = 0;
  limit = 10;
  collectionCount = 0;
  dt_from = "";
  dt_to = "";
  Admin_Total: 0;
  provider_Total: 0;
  Total: 0;
  userType;

  public get UserType(): typeof UserType {
    return UserType;
  }

  constructor(
    private helper: ConstantServiceWrapper,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.userType = localStorage.getItem("type");
    if(this.userType == UserType.STORE){
      this.searchObject.supplier_id =  localStorage.getItem("admin_id");
      this.changeSupplier(this.searchObject.supplier_id)
    }
    if(this.userType == UserType.SUPERVISOR){
      this.helper.getSingleSupervisor(localStorage.getItem("admin_id")).subscribe(x=>{
        let object = x[appConstant.ITEMS] as any;
        this.searchObject.supplier_id =  object.supplier_id
        this.searchObject.place_id =  object.place_id
        this.changeSupplier(this.searchObject.supplier_id)
        this.getOrder(this.searchObject);
      })
    }
  }

  ngOnInit(): void {
    this.getAllProviders()
    this.getOrder(this.searchObject);
  }

  getAllProviders() {
    this.helper.getAllProviders().subscribe((x) => {
      this.providers = x[appConstant.ITEMS] as any[];
    });
  }

  getOrder(filter) {
    this.helper.orders_earning(filter).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let arr = x[appConstant.ITEMS] as any[];
        if(arr[0] != null && arr[0] != undefined ){
          this.orders = arr;
        }else{
          this.orders = []
        }
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  search() {
    this.page = 0;
    if (this.dt_from != "") {
      let dt_from = this.momentFormat.format(this.dt_from as any);
      this.searchObject.dt_from = dt_from;
    }
    if (this.dt_to != "") {
      let dt_to = this.momentFormat.format(this.dt_to as any);
      this.searchObject.dt_to = dt_to;
    }
    this.getOrder(this.searchObject);
  }

  changeStatus(statusId) {
    this.searchObject.status = statusId;
    this.page = 0;
    this.getOrder(this.searchObject);
  }
  reset() {
    this.dt_from = "";
    this.dt_to = "";
    this.searchObject = {
      dt_from: "",
      dt_to: "",
      status: "finished",
      supplier_id: "",
      place_id:""
    };
    this.page = 0;
    this.getOrder(this.searchObject);
  }

  getOfferUser(item:any){
    let offers = item.offers.find(x=>String(x.status) == "accept_offer")
    console.log(offers)
    return offers && offers.user ? offers.user.full_name : ""
  }

  changeSupplier(event) {
    this.helper.getAllPlacesDelivery(event).subscribe((x) => {
      this.places = x[appConstant.ITEMS] as any[];
    });
  }


  excel() {
    var fields = [];
    this.helper
      .orders_earning(this.searchObject)
      .subscribe((res_data) => {
        let data = res_data["items"] as any[];
        data.forEach((user, index) => {
          fields.push({
            "Title": "\ufeff" + user["title"],
            "Place": "\ufeff" + user["place"],
            "Supervisor": "\ufeff" + user["supervisor"],
            "Total Taxs": "\ufeff" + user["totalTaxs"],
            "Total Discounts": "\ufeff" + user["totalDiscounts"],
            "Totals": "\ufeff" + user["totals"],
          });
        });

        jsonexport(fields, function (err, csv) {
          if (err) return console.log(err);
          var blob = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8",
          });
          var url = window.URL.createObjectURL(blob);
          var element = document.createElement("a");
          element.setAttribute("href", encodeURI(url));
          element.setAttribute("download", "المستحقات المالية" + ".csv");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      });
  }
}
